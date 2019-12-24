import React, {Component} from 'react';
import Header from '../header';
import Error from '../errorMessage'
import {StarshipsPage, PlanetsPage, PeoplePage} from "../pages/";
import RandomPlanet from "../random-planet";
import './app.css';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import {SwapiServiceProvider} from "../swapi-service-context";

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService
                ? DummySwapiService : SwapiService;
            console.log( "-------", Service.name);
            return {
                swapiService: new Service()
            };
        });
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
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />
                        <PeoplePage />
                        <PlanetsPage />
                        <StarshipsPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
