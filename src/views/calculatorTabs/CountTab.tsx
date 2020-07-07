import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import SwipableList, { SwipableListElement } from '../../components/SwipableList';
import { CountCompareData, removeDataFromCountAndSaveToHistory, useStore } from '../../state/state';
import CountForm from './CountForm';
import { PIRE_PRICE_COLOR, BEST_PRICE_COLOR } from '../../service/constants';

const CountTab: React.FC<{}> = () => {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const { state, dispatch } = useStore();
    const maxId = getCountMaxId(state.calculation.count);
    const minId = getCountMinId(state.calculation.count);
    const elements: SwipableListElement[] = state.calculation.count.map(el => ({
        id: el.id,
        swipeAction: () => removeDataFromCountAndSaveToHistory(dispatch, el.id),
        renderFunction: () => renderCountElement(el),
        border: el.id === maxId ? `2px solid ${PIRE_PRICE_COLOR}` : (el.id === minId ? `2px solid ${BEST_PRICE_COLOR}` : undefined) 
    }));
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <SwipableList
                elements={elements}
            />
            <AddButton onClick={() => setFormOpen(true)} />
            <CountForm
                isOpen={isFormOpen}
                handleClose={() => setFormOpen(false)}
            />
        </div>
    )
}

export default CountTab;

export const getPriceBy1Unit = (count: number, price: number): number => {
    const priceForOneUnit = price / count;
    return priceForOneUnit;
}

export const renderCountElement = (el: CountCompareData) => {
    return (
        <>
            <Typography variant="subtitle2">{`Count: ${el.count}`}</Typography>
            <Typography variant="subtitle2">{`Price: ${el.price}`}</Typography>
            <Typography variant="subtitle2">{`REAL PRICE FOR 1 UNIT: ${getPriceBy1Unit(el.count, el.price).toFixed(2)}`}</Typography>
        </>
    )
}

export const getCountMinId = (data: CountCompareData[]) => {
    if (data.length < 2)
        return undefined;
    //check if all prices the same
    if (data.every(el => Math.abs(getPriceBy1Unit(el.count, el.price) - getPriceBy1Unit(data[0].count, data[0].price)) < 0.01)){
        return undefined
    }
    let indexMin = 0;
    let minId = data[indexMin].id;
    for (let i = 1; i< data.length; i++){
        if (getPriceBy1Unit(data[i].count, data[i].price) < getPriceBy1Unit(data[indexMin].count, data[indexMin].price)){
            minId = data[i].id;
            indexMin = i;
        }
    }
    return minId;
}

export const getCountMaxId = (data: CountCompareData[]) => {
    if (data.length < 2)
        return undefined;
    
    //check if all prices the same
    if (data.every(el => Math.abs(getPriceBy1Unit(el.count, el.price) - getPriceBy1Unit(data[0].count, data[0].price)) < 0.01)){
        return undefined
    }
    let indexMax = 0;
    let maxId = data[indexMax].id;
    for (let i = 1; i< data.length; i++){
        if (getPriceBy1Unit(data[i].count, data[i].price) > getPriceBy1Unit(data[indexMax].count, data[indexMax].price)){
            maxId = data[i].id;
            indexMax = i;
        }
    }
    return maxId;
}