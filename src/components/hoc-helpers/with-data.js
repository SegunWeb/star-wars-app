import React, { Component } from 'react';

import Spinner from '../spinner';
import Error from '../errorMessage';

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false,
    };
    componentDidUpdate(prevProps) {
      if(this.props.getData !== prevProps.getData) {
        this.upDate()
      }
    }

    componentDidMount() {
      this.upDate()
    }

    upDate() {
      this.setState({
        loading: true,
        error: false
      });

      this.props.getData()
          .then((data) => {
            this.setState({
              data,
              loading: false
            });
          })
          .catch(() => {
            this.setState({
                error: true,
                loading: false
            })
      })
    }

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }
      if(error) {
        return <Error />
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
