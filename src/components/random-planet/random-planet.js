import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SwapiService from "../../services/swapi-service";
import Spiner from '../spinner/'
import Error from "../errorMessage";

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiServise = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const { updateIntervel } = this.props;
    this.updatePlanet();
    this.timerId = setInterval(this.updatePlanet, updateIntervel);
  }

  componentWillUnmount() {
      clearInterval(this.timerId);
    }

  onPlanetLoaded = (planet) => {
    this.setState( {
      planet,
      loading: false,
    });
  };

  onPlanetError = () => {
    this.setState( {
      loading: false,
      error: true
    });
  };

  updatePlanet =() => {
    const id = Math.floor(Math.random() * 25 + 2) ;
    this.swapiServise.getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onPlanetError)

  };

  render() {
    const {  planet, loading, error  }  = this.state;
    const spiner = loading ? <Spiner/> : null;
    const errorMessage = error ? <Error/> : null;
    const content = !(loading || errorMessage) ? <View planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
          {spiner}
          {errorMessage}
          {content}
        </div>
    );
  }
  static defaultProps = {
    updateIntervel: 10000
  };
  static propTypes = {
    updateIntervel: PropTypes.number
    // updateIntervel: (props, propName, componentName) => {
    //   const value = props[propName];
    //
    //   if(typeof value === 'number' && !isNaN(value)) {
    //     return null;
    //   }
    //   return new TypeError(`${componentName}: ${propName} must be number`)
    // }
  };
}

// RandomPlanet.defaultProps = {
//   updateIntervel: 10000
// };

const View = ({planet}) => {
  const {name , population, rotationPeriod, diameter, id}  = planet;

  return (
      <>
        <img className="planet-image" alt=""
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">{population}</span>
              <span>123124</span>
            </li>
            <li className="list-group-item">
              <span className="term">{rotationPeriod}</span>
              <span>43</span>
            </li>
            <li className="list-group-item">
              <span className="term">{diameter}</span>
              <span>100</span>
            </li>
          </ul>
        </div>
      </>

  );
};
