import React, {Component} from 'react';

import Header from '../header';
// import RandomPlanet from '../random-planet';
// import PeoplePage from "../people-page";
import Error from '../errorMessage'
import Row from "../row"
import ItemDetails, { Record } from "../items-details/items-details";
import './app.css';
import SwapiService from "../../services/swapi-service";

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

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={this.swapiService.getPerson}
                getImageUrl={this.swapiService.getPersonImage} >

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={this.swapiService.getStarship}
                getImageUrl={this.swapiService.getStarshipImage}>


            </ItemDetails>

        );



        return (
            <div>
                <Header/>
                {/*<RandomPlanet/>*/}
                {/*<div className="row mb2 button-row">*/}
                {/*    <ErrorButton />*/}
                {/*</div>*/}
                {/*<PeoplePage />*/}

                <Row left={starshipDetails} right={personDetails} />
            </div>
        );
    }
};
