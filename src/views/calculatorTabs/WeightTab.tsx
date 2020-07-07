import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import SwipableList, { SwipableListElement } from '../../components/SwipableList';
import WeightType from '../../enums/weightType';
import { convertWeight } from '../../service/index';
import { removeDataFromWeightAndSaveToHistory, useStore, WeightCompareData } from '../../state/state';
import WeightForm from './WeightForm';
import { PIRE_PRICE_COLOR, BEST_PRICE_COLOR } from '../../service/constants';

const WeightTab: React.FC<{}> = () => {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const { state, dispatch } = useStore();
    const maxId = getWeightMaxId(state.calculation.weight);
    const minId = getWeightMinId(state.calculation.weight);
    const elements: SwipableListElement[] = state.calculation.weight.map(el => ({
        id: el.id,
        swipeAction: () => removeDataFromWeightAndSaveToHistory(dispatch, el.id),
        renderFunction: () => renderWeightElement(el),
        border: el.id === maxId ? `2px solid ${PIRE_PRICE_COLOR}` : (el.id === minId ? `2px solid ${BEST_PRICE_COLOR}` : undefined) 
    }));
    console.log("rerender")
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <SwipableList
                elements={elements}
            />
            <AddButton onClick={() => setFormOpen(true)} />
            <WeightForm
                isOpen={isFormOpen}
                handleClose={() => setFormOpen(false)}
            />
        </div>
    )
}

export default WeightTab;

export const getPriceBy100g = (unitType: WeightType, count: number, price: number): number => {
    const priceForOneUnit = price / count;
    const conversionCoefficient = convertWeight(WeightType.gram, unitType, 1);
    const priceFor_1g = priceForOneUnit * conversionCoefficient;
    return priceFor_1g * 100;
}

export const renderWeightElement = (el: WeightCompareData) => {
    return (
        <>
            <Typography variant="subtitle2">{`Units: ${el.unitType}`}</Typography>
            <Typography variant="subtitle2">{`Weight: ${el.count}`}</Typography>
            <Typography variant="subtitle2">{`Price: ${el.price}`}</Typography>
            <Typography variant="subtitle2">{`REAL PRICE FOR 100g: ${getPriceBy100g(el.unitType, el.count, el.price).toFixed(2)}`}</Typography>
        </>
    )
}

export const getWeightMinId = (data: WeightCompareData[]) => {
    if (data.length < 2)
        return undefined;
    //check if all prices the same
    if (data.every(el => Math.abs(getPriceBy100g(el.unitType, el.count, el.price) - getPriceBy100g(data[0].unitType, data[0].count, data[0].price)) < 0.01)){
        return undefined
    }
    let indexMin = 0;
    let minId = data[indexMin].id;
    for (let i = 1; i< data.length; i++){
        if (getPriceBy100g(data[i].unitType, data[i].count, data[i].price) < getPriceBy100g(data[indexMin].unitType, data[indexMin].count, data[indexMin].price)){
            minId = data[i].id;
            indexMin = i;
        }
    }
    return minId;
}

export const getWeightMaxId = (data: WeightCompareData[]) => {
    if (data.length < 2)
        return undefined;
    
    //check if all prices the same
    if (data.every(el => Math.abs(getPriceBy100g(el.unitType, el.count, el.price) - getPriceBy100g(data[0].unitType, data[0].count, data[0].price)) < 0.01)){
        return undefined
    }
    let indexMax = 0;
    let maxId = data[indexMax].id;
    for (let i = 1; i< data.length; i++){
        if (getPriceBy100g(data[i].unitType, data[i].count, data[i].price) > getPriceBy100g(data[indexMax].unitType, data[indexMax].count, data[indexMax].price)){
            maxId = data[i].id;
            indexMax = i;
        }
    }
    return maxId;
}