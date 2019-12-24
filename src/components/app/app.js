import React, {Component} from 'react';
import Header from '../header';
import Error from '../errorMessage'
import Row from "../row"
import ItemDetails, { Record } from "../items-details/items-details";
import './app.css';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";


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


    state = {
        hasError: false,
        swapiService: new DummySwapiService(),
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



        const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage } = this.state.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );




        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
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
