import Typography from '@material-ui/core/Typography';
import React from 'react';
import SwipableList, { SwipableListElement } from '../components/SwipableList';
import { HistoryData, removeFromHistory, useStore } from '../state/state';
import CalculationType from '../enums/calculationType';

const HistoryView: React.FC<{}> = () => {
    const { state, dispatch } = useStore();
    const renderElement = (el: HistoryData) => {
        return (
            <>
                <Typography variant="subtitle2">{`Date: ${new Date(el.date).toLocaleString()}`}</Typography>
                <Typography variant="subtitle2">{`Type: ${CalculationType[el.type]}`}</Typography>
            </>
        )
    }
    const elements: SwipableListElement[] = state.history.map(el => ({
        id: el.date,
        swipeAction: () => dispatch(removeFromHistory(el.date)),
        renderFunction: () => renderElement(el)
    }));
    return(
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <SwipableList 
                elements={elements}
            />
        </div>
    )
}

export default HistoryView;