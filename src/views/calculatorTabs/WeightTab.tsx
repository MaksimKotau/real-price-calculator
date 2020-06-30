import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import SwipableList, { SwipableListElement } from '../../components/SwipableList';
import WeightType from '../../enums/weightType';
import { convertWeight } from '../../service/index';
import { removeDataFromWeightAndSaveToHistory, useStore, WeightCompareData } from '../../state/state';
import WeightForm from './WeightForm';

const WeightTab: React.FC<{}> = () => {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const { state, dispatch } = useStore();
    const elements: SwipableListElement[] = state.calculation.weight.map(el => ({
        id: el.id,
        swipeAction: () => removeDataFromWeightAndSaveToHistory(dispatch, el.id),
        renderFunction: () => renderWeightElement(el)
    }));
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