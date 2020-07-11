import React, { createContext, useContext, useReducer } from 'react';
import CalculationType from "../enums/calculationType";
import VolumeType from "../enums/volumeType";
import WeightType from "../enums/weightType";
import { HISTORY_SIZE } from "../service/constants";
import {
    ADD_TO_COUNT_COMPARISON,



    ADD_TO_HISTORY, ADD_TO_VOLUME_COMPARISON,
    ADD_TO_WEIGHT_COMPARISON,









    CHANGE_THEME, CLEAR_COUNT, CLEAR_HISTORY,

    CLEAR_VOLUME,
    CLEAR_WEIGHT, DELETE_FROM_COUNT_COMPARISON,

    DELETE_FROM_HISTORY, DELETE_FROM_VOLUME_COMPARISON, DELETE_FROM_WEIGHT_COMPARISON
} from './actionTypes';
import { getInitialState, withLocalStorageCache } from "./utils";

export interface ActionType<T> {
    type: T;
}

export interface CountCompareData {
    count: number,
    price: number,
    id: number
}

export interface WeightCompareData extends CountCompareData {
    unitType: WeightType,
}

export interface VolumeCompareData extends CountCompareData {
    unitType: VolumeType,
}

export interface CalculationState {
    weight: WeightCompareData[],
    count: CountCompareData[],
    volume: VolumeCompareData[]
}

export interface HistoryData {
    date: number,
    type: CalculationType,
    data: CountCompareData[] | WeightCompareData[] | VolumeCompareData[]
}

export interface UIState {
    isDark: boolean
}

export interface ApplicationState {
    calculation: CalculationState,
    history: HistoryData[],
    ui: UIState
}

interface AddToWeightComparaisonAction extends ActionType<"ADD_TO_WEIGHT_COMPARISON"> {
    data: WeightCompareData,
}

interface AddToVolumeComparaisonAction extends ActionType<"ADD_TO_VOLUME_COMPARISON"> {
    data: VolumeCompareData,
}

interface AddToCountComparaisonAction extends ActionType<"ADD_TO_COUNT_COMPARISON"> {
    data: CountCompareData,
}

interface AddToHistoryAction extends ActionType<"ADD_TO_HISTORY"> {
    dataType: CalculationType,
}

interface DeleteFromWeightComparaisonAction extends ActionType<"DELETE_FROM_WEIGHT_COMPARISON"> {
    id: number,
}

interface DeleteFromVolumeComparaisonAction extends ActionType<"DELETE_FROM_VOLUME_COMPARISON"> {
    id: number,
}

interface DeleteFromCountComparaisonAction extends ActionType<"DELETE_FROM_COUNT_COMPARISON"> {
    id: number,
}

interface DeleteFromHistoryAction extends ActionType<"DELETE_FROM_HISTORY"> {
    date: number,
}

interface ClearHistoryAction extends ActionType<"CLEAR_HISTORY"> { }

interface ClearWeightCompareAction extends ActionType<"CLEAR_WEIGHT"> { }

interface ClearVolumeCompareAction extends ActionType<"CLEAR_VOLUME"> { }

interface ClearCountCompareAction extends ActionType<"CLEAR_COUNT"> { }

interface ChangeThemeAction extends ActionType<"CHANGE_THEME"> {
    isDark: boolean,
}

export function addDataToWeightCompare(data: WeightCompareData): AddToWeightComparaisonAction {
    return {
        type: ADD_TO_WEIGHT_COMPARISON,
        data
    }
}

export function addDataToVolumeCompare(data: VolumeCompareData): AddToVolumeComparaisonAction {
    return {
        type: ADD_TO_VOLUME_COMPARISON,
        data
    }
}

export function addDataToCountCompare(data: CountCompareData): AddToCountComparaisonAction {
    return {
        type: ADD_TO_COUNT_COMPARISON,
        data
    }
}

export function addDataToHistory(dataType: CalculationType): AddToHistoryAction {
    return {
        type: ADD_TO_HISTORY,
        dataType
    }
}

export function removeFromWeightCompare(id: number): DeleteFromWeightComparaisonAction {
    return {
        type: DELETE_FROM_WEIGHT_COMPARISON,
        id
    }
}

export function removeFromVolumeCompare(id: number): DeleteFromVolumeComparaisonAction {
    return {
        type: DELETE_FROM_VOLUME_COMPARISON,
        id
    }
}

export function removeFromCountCompare(id: number): DeleteFromCountComparaisonAction {
    return {
        type: DELETE_FROM_COUNT_COMPARISON,
        id
    }
}

export function removeFromHistory(date: number): DeleteFromHistoryAction {
    return {
        type: DELETE_FROM_HISTORY,
        date
    }
}

export function clearHistory(): ClearHistoryAction {
    return {
        type: CLEAR_HISTORY
    }
}

export function clearWeightCompare(): ClearWeightCompareAction {
    return {
        type: CLEAR_WEIGHT
    }
}

export function clearVolumeCompare(): ClearVolumeCompareAction {
    return {
        type: CLEAR_VOLUME
    }
}

export function clearCountCompare(): ClearCountCompareAction {
    return {
        type: CLEAR_COUNT
    }
}

function changeTheme(isDark: boolean): ChangeThemeAction {
    return {
        type: CHANGE_THEME,
        isDark
    }
}


export type Action = AddToWeightComparaisonAction |
    AddToVolumeComparaisonAction |
    AddToCountComparaisonAction |
    DeleteFromWeightComparaisonAction |
    DeleteFromVolumeComparaisonAction |
    DeleteFromCountComparaisonAction |
    AddToHistoryAction |
    DeleteFromHistoryAction |
    ClearHistoryAction |
    ClearVolumeCompareAction |
    ClearWeightCompareAction |
    ClearCountCompareAction |
    ChangeThemeAction;

export function appReducer(state: ApplicationState, action: Action): ApplicationState {
    switch (action.type) {
        case ADD_TO_WEIGHT_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    weight: [action.data, ...state.calculation.weight]
                }
            }
        case ADD_TO_VOLUME_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    volume: [...state.calculation.volume, action.data]
                }
            }
        case ADD_TO_COUNT_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    count: [...state.calculation.count, action.data]
                }
            }
        case DELETE_FROM_WEIGHT_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    weight: [...state.calculation.weight.filter(el => el.id !== action.id)]
                }
            }
        case DELETE_FROM_VOLUME_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    volume: [...state.calculation.volume.filter(el => el.id !== action.id)]
                }
            }
        case DELETE_FROM_COUNT_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    count: [...state.calculation.count.filter(el => el.id !== action.id)]
                }
            }
        case ADD_TO_HISTORY:
            return getStateHistory(state, action.dataType)
        case DELETE_FROM_HISTORY:
            return {
                ...state,
                history: state.history.filter(el => el.date !== action.date)
            }
        case CLEAR_HISTORY:
            return {
                ...state,
                history: []
            }
        case CLEAR_WEIGHT:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    weight: []
                }
            }
        case CLEAR_VOLUME:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    volume: []
                }
            }
        case CLEAR_COUNT:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    count: []
                }
            }
        case CHANGE_THEME:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isDark: action.isDark
                }
            }
        default:
            return state;
    }
}

const StateKeys: string[] = ['weight', 'volume', 'count'];

const getStateHistory = (state: ApplicationState, type: CalculationType): ApplicationState => {
    if (state.calculation[StateKeys[type as number] as keyof CalculationState].length === 0) {
        return state;
    } else {
        return {
            ...state,
            history: [
                {
                    type,
                    date: new Date().getTime(),
                    data: state.calculation[StateKeys[type as number] as keyof CalculationState]
                },
                ...state.history
            ].slice(0, HISTORY_SIZE)
        }
    }
}

const StoreContext = createContext<{ state: ApplicationState, dispatch: any }>({ state: getInitialState(), dispatch: () => { } });

const StoreProvider: React.FC<{}> = (props) => {
    const [state, dispatch] = useReducer(
        withLocalStorageCache(appReducer),
        getInitialState()
    );
    const value = { state, dispatch };
    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;

export const useStore = () => useContext(StoreContext);

export function addDataToWeightCompareAndHistory(dispatch: any, data: WeightCompareData) {
    dispatch(addDataToWeightCompare(data));
    dispatch(addDataToHistory(CalculationType.WEIGHT));
}

export function removeDataFromWeightAndSaveToHistory(dispatch: any, id: number) {
    dispatch(removeFromWeightCompare(id));
    dispatch(addDataToHistory(CalculationType.WEIGHT));
}

export function addDataToVolumeCompareAndHistory(dispatch: any, data: VolumeCompareData) {
    dispatch(addDataToVolumeCompare(data));
    dispatch(addDataToHistory(CalculationType.VOLUME));
}

export function removeDataFromVolumeAndSaveToHistory(dispatch: any, id: number) {
    dispatch(removeFromVolumeCompare(id));
    dispatch(addDataToHistory(CalculationType.VOLUME));
}

export function addDataToCountCompareAndHistory(dispatch: any, data: CountCompareData) {
    dispatch(addDataToCountCompare(data));
    dispatch(addDataToHistory(CalculationType.COUNT));
}

export function removeDataFromCountAndSaveToHistory(dispatch: any, id: number) {
    dispatch(removeFromCountCompare(id));
    dispatch(addDataToHistory(CalculationType.COUNT));
}

export function changeCurrentTheme(dispatch: any, isDark: boolean) {
    dispatch(changeTheme(isDark))
}