import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import SwipableList, { SwipableListElement } from '../components/SwipableList';
import CalculationType from '../enums/calculationType';
import { useCompareRenderFunction } from '../service/hooks/useCompareRenderFunction';
import { HistoryData, removeFromHistory, useStore, CountCompareData, WeightCompareData, VolumeCompareData } from '../state/state';
import {getCountMaxId, getCountMinId} from './calculatorTabs/CountTab';
import {getVolumeMaxId, getVolumeMinId} from './calculatorTabs/VolumeTab';
import {getWeightMaxId, getWeightMinId} from './calculatorTabs/WeightTab';
import { PIRE_PRICE_COLOR, BEST_PRICE_COLOR } from '../service/constants';


const HistoryView: React.FC<{}> = () => {
    const { state, dispatch } = useStore();
    const [renderData, setRenderData] = useState<HistoryData | null>(null);
    useEffect(() => {
        return () => {
            setRenderData(null);
        }
    }, []);
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
        renderFunction: () => renderElement(el),
        onElementClick: () => setRenderData(el),
    }));
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <SwipableList
                elements={elements}
            />
            <HistoryElement
                data={renderData}
                onClose={() => setRenderData(null)}
            />
        </div>
    )
}

export default HistoryView;

const HistoryElement: React.FC<{ data: HistoryData | null, onClose: () => void }> = (props) => {
    const renderElement = useCompareRenderFunction(props.data ? props.data.type : null);
    let elements: SwipableListElement[] = [];
    if (props.data && renderElement) {
        const maxId = getMaxId(props.data.data, props.data.type);
        const minId = getMinId(props.data.data, props.data.type);
        elements = (props.data!.data as any[]).map((el: any) => ({
            id: el.id,
            swipeAction: () => { },
            renderFunction: () => renderElement(el),
            border: el.id === maxId ? `2px solid ${PIRE_PRICE_COLOR}` : (el.id === minId ? `2px solid ${BEST_PRICE_COLOR}` : undefined) 
        } as SwipableListElement));
    }
    if (!props.data)
        return null
    return (
        <Slide direction="up" in={Boolean(props.data)} mountOnEnter unmountOnExit>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                }}
            >
                <Paper style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column" }} square>
                    <div style={{ height: 105 }}>
                        <IconButton
                            style={{ marginLeft: 10 }}
                            onClick={props.onClose}
                        >
                            <CloseIcon fontSize="large"/>
                        </IconButton>
                        <div style={{ marginLeft: 40 }}>
                            <Typography>
                                Type: {CalculationType[props.data.type]}
                            </Typography>
                            <Typography>
                                Date: {new Date(props.data.date).toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
                        <SwipableList
                            elements={elements}
                            disableDelete
                        />
                    </div>
                </Paper>
            </div>
        </Slide >
    )
}

const getMinId = (data: CountCompareData[] | WeightCompareData[] | VolumeCompareData[], type: CalculationType) => {
    switch (type){
        case CalculationType.VOLUME:
            return getVolumeMinId(data as VolumeCompareData[]);
        case CalculationType.WEIGHT:
            return getWeightMinId(data as WeightCompareData[]);
        default:   
            return getCountMinId(data as CountCompareData[]);
    }
}

const getMaxId = (data: CountCompareData[] | WeightCompareData[] | VolumeCompareData[], type: CalculationType) => {
    switch (type){
        case CalculationType.VOLUME:
            return getVolumeMaxId(data as VolumeCompareData[]);
        case CalculationType.WEIGHT:
            return getWeightMaxId(data as WeightCompareData[]);
        default:   
            return getCountMaxId(data as CountCompareData[]);
    }
}