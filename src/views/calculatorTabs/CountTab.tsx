import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import SwipableList, { SwipableListElement } from '../../components/SwipableList';
import { CountCompareData, removeDataFromCountAndSaveToHistory, useStore } from '../../state/state';
import CountForm from './CountForm';

const CountTab: React.FC<{}> = () => {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const { state, dispatch } = useStore();
    const elements: SwipableListElement[] = state.calculation.count.map(el => ({
        id: el.id,
        swipeAction: () => removeDataFromCountAndSaveToHistory(dispatch, el.id),
        renderFunction: () => renderCountElement(el)
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