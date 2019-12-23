import React, { Component } from 'react';
import Spiner from '../spinner/'
import './item-list.css';
import SwapiService from "../../services/swapi-service";



export default class ItemList extends Component {

    swapiServise = new SwapiService();

    state = {
        itemList: null,
    };

    componentDidMount() {
        this.swapiServise.getAllPeople()
            .then((itemList) => {
                this.setState({
                    itemList,
                })
            })
    }

    renderItems(arr) {
       return arr.map(({id, name}) => {

           return (
               <li
                   key={id}
                   className="list-group-item"
                   onClick={() => this.props.onItemSelected(id)}
               >
                   {name}
               </li>
           )
       })
    }
    render() {
        const {itemList} = this.state;
        if(!itemList) {
            return <Spiner />
        }
        const items = this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
          {items}
      </ul>
    );
  }
}
