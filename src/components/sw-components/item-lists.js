import React from 'react';
import ItemList from "../item-list/item-list";
import {withData, withSwapiService } from '../hoc-helpers'
// import SwapiService from '../../services/swapi-service'
//
// const swapiService = new SwapiService();
// const {
//     getAllPeople,
//     getAllStarships,
//     getAllPlanets
// } = swapiService;

const withChildFunc = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped  {...props}>
                {fn}
            </Wrapped>
        )
    }
};

// const ListWithChildren = withChildFunc(
// //     ItemList,
// //     ({name}) => <span>{name}</span>
// // );

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

const PersonList = withSwapiService(withData(
                    withChildFunc(ItemList, renderName)), mapPersonMethodsToProps);
const StarshipList = withSwapiService(withData(
                    withChildFunc(ItemList, renderModelAndName)), mapPlanetsMethodsToProps);
const PlanetList = withSwapiService(withData(
                    withChildFunc(ItemList, renderName)),mapStarshipsMethodsToProps);

export {
    PersonList,
    StarshipList,
    PlanetList,
}