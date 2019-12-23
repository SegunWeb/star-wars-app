import React, {Component} from 'react';
import Header from '../header';
import Error from '../errorMessage'
import Row from "../row"
import ItemDetails, { Record } from "../items-details/items-details";
import './app.css';
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

import {SwapiServiceProvider} from "../swapi-service-context";

import {
    PersonDetails,
    StarshipDetails,
    PlanetDetails,
    PersonList,
    StarshipList,
    PlanetList,
} from '../sw-components'


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
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header />
                        <PersonList />
                        <PlanetList />
                        <StarshipList />

                    </div>
                    <br/>
                    <br/>
                    <div className="stardb-app">
                        <PersonDetails itemId={11} />
                        <PlanetDetails itemId={11}/>
                        <StarshipDetails itemId={11}/>
                    </div>
                </SwapiServiceProvider>

            </ErrorBoundry>
        );
    }
};
