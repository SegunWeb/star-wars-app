import React from 'react';
import ItemList from "../item-list/item-list";
import {withData} from '../hoc-helpers'
import SwapiService from '../../services/swapi-service'

const swapiService = new SwapiService();
const {
    getAllPeople,
    getAllStarships,
    getAllPlanets
} = swapiService;

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

const PersonList = withData(
                    withChildFunc(ItemList, renderName),
                    getAllPeople);
const StarshipList = withData(
                    withChildFunc(ItemList, renderModelAndName),
                    getAllStarships);
const PlanetList = withData(
                    withChildFunc(ItemList, renderName),
                    getAllPlanets);

export {
    PersonList,
    StarshipList,
    PlanetList,
}