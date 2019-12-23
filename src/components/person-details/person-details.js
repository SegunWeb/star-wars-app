import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import './person-details.css';
// import Spiner from '../spinner/'

export default class PersonDetails extends Component {

  swapiServise = new SwapiService();

  state = {
    person: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updatePerson()
    }
  }

  updatePerson() {
    const {itemId} = this.props;
    if(!itemId) {
      return;
    }

    this.swapiServise.getPerson(itemId)
        .then((person) => {
          this.setState({
            person,
          })
        })
  }

  render() {
    if(!this.state.person) {
      return <span>Selected a person from a list</span>
    }

    const {id, name, gender, eyeColor, brithYear } = this.state.person;
    return (
      <div className="person-details card">
        <img className="person-image" alt={`${id}.jpg`}
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}   />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{brithYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
