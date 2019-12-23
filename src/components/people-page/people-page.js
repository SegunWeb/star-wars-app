import React, { Component } from 'react';
import ItemList from '../item-list/item-list';
import ItemsDetails from '../items-details/items-details';
import Error from '../errorMessage';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import './people-page.css';
import SwapiService from "../../services/swapi-service";




export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedItem: 3,
  };

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

    const itemList = (
        <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.swapiService.getAllPeople}>
          {(i) => (`${i.name} (${i.gender})`)}
        </ ItemList>

    );

    const personDetails = (
        <ItemsDetails itemId={selectedItem}/>
    );

    return (
        <ErrorBoundry>
          <Row left={itemList} right={personDetails} />
        </ErrorBoundry>
    )
  }
}
