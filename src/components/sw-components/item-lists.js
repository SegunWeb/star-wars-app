import React from 'react';
import ItemList from "../item-list/item-list";
import {withData, withSwapiService } from '../hoc-helpers'
import {compose, withChildFunc} from "../hoc-helpers";

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({name, model}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
};
const mapPlanetsMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
};
const mapStarshipsMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
};

const PersonList = compose(
                    withSwapiService(mapPersonMethodsToProps),
                    withData,
                    withChildFunc(renderName))
                    (ItemList);

const StarshipList = compose(
                    withSwapiService(mapPlanetsMethodsToProps),
                    withData,
                    withChildFunc(renderModelAndName))
                    (ItemList);


const PlanetList = compose(
                    withSwapiService(mapStarshipsMethodsToProps),
                    withData,
                    withChildFunc(renderName))
                    (ItemList);

export {
    PersonList,
    StarshipList,
    PlanetList,
}