import React, { Component } from 'react';
import ErrorButton from '../error-button'
// import SwapiService from "../../services/swapi-service";
import './details.css';
// import Spiner from '../spinner/'


const Record = ({item, field, label}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{ field }</span>
      </li>
  )
};

export {Record};

export default class ItemDetails extends Component {

  // swapiServise = new SwapiService();

  state = {
    item: null,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl} = this.props;
    if(!itemId) {
      return;
    }

    getData(itemId)
        .then((item) => {
          this.setState({
            item,
            image: getImageUrl(item),
          })
        })
  }


  render() {
    if(!this.state.item) {
      return <span>Selected a person from a list</span>
    }

    const {id, name, gender, eyeColor, brithYear } = this.state.item;
    const {image} = this.state;
    return (

     <div>
       <div className="person-details card">
         <img className="person-image" alt={`${id}.jpg`} src={image}   />
         <div className="card-body">
           <h4>{name}</h4>
           <ul className="list-group list-group-flush">
             {this.props.children}
           </ul>
         </div>
       </div>

       <div>
         <ErrorButton />
       </div>
     </div>
    )
  }
}
