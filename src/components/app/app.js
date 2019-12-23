import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import Error from '../errorMessage'
import ErrorButton from "../error-button";

import './app.css';
import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list";
import PersonDetails from "../person-details";


export default class App extends Component {


    swapiService = new SwapiService();

    state = {
        hasError: false,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, })
    }

    render() {
        if(this.state.hasError) {
            return <Error />
        }
        return (
            <div>
                <Header/>
                <RandomPlanet/>
                <div className="row mb2 button-row">
                    <ErrorButton />
                </div>
                <PeoplePage />
            </div>
        );
    }
};
