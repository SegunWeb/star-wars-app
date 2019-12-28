import React, {Component} from 'react';
import Header from '../header';
import Error from '../errorMessage'
import {StarshipsPage, PlanetsPage, PeoplePage} from "../pages/";
import RandomPlanet from "../random-planet";
import './app.css';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {BrowserRouter, Route} from 'react-router-dom';
import {StarshipDetails} from "../sw-components";

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
                    <BrowserRouter>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />

                        <Route path="/" exact render={() => <h2>Welcome to Star DB</h2>} />
                        <Route path="/people/:id?" component={PeoplePage} />
                        <Route path="/planets" component={PlanetsPage} />
                        <Route path="/starships" exact component={StarshipsPage} />
                        <Route path="/starships/:id"
                                    render={({match}) => {
                                        const {id} = match.params;
                                        return (
                                            <StarshipDetails itemId={id}/>
                                            )
                                    }}
                        />
                    </div>
                    </BrowserRouter>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
