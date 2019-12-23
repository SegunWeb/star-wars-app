import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import Error from '../errorMessage';

import './people-page.css';
import ErrorButton from "../error-button";

export default class PeoplePage extends Component {

  state = {
    selectedItem: 3,
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    })
  }

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
    })
  };

  render() {
    const {selectedItem, hasError} = this.state;

    if(hasError) {
      return <Error />
    }

    return (
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList  onItemSelected={this.onItemSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails itemId={selectedItem}/>
            <div className="row mb2 button-row">
              <ErrorButton />
            </div>
          </div>
        </div>
    )
  }
}
