import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import SwipableList, { SwipableListElement } from '../../components/SwipableList';
import VolumeType from '../../enums/volumeType';
import { convertVolume } from '../../service/index';
import { removeDataFromVolumeAndSaveToHistory, useStore, VolumeCompareData } from '../../state/state';
import VolumeForm from './VolumeForm';

const VolumeTab: React.FC<{}> = () => {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const { state, dispatch } = useStore();
    const renderElement = (el: VolumeCompareData) => {
        return (
            <>
                <Typography variant="subtitle2">{`Units: ${el.unitType}`}</Typography>
                <Typography variant="subtitle2">{`Volume: ${el.count}`}</Typography>
                <Typography variant="subtitle2">{`Price: ${el.price}`}</Typography>
                <Typography variant="subtitle2">{`REAL PRICE FOR 100ml: ${getPriceBy100ml(el.unitType, el.count, el.price)}`}</Typography>
            </>
        )
    }
    const elements: SwipableListElement[] = state.calculation.volume.map(el => ({
        id: el.id,
        swipeAction: () => removeDataFromVolumeAndSaveToHistory(dispatch, el.id),
        renderFunction: () => renderElement(el)
    }));
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <SwipableList
                elements={elements}
            />
            <AddButton onClick={() => setFormOpen(true)} />
            <VolumeForm
                isOpen={isFormOpen}
                handleClose={() => setFormOpen(false)}
            />
        </div>
    )
}

export default VolumeTab;

export const getPriceBy100ml = (unitType: VolumeType, count: number, price: number): number => {
    const priceForOneUnit = price / count;
    const conversionCoefficient = convertVolume(VolumeType.milliliter, unitType, 1);
    const priceFor_1ml = priceForOneUnit * conversionCoefficient;
    return priceFor_1ml * 100;
}