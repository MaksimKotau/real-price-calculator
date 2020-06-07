import WeightType from "../enums/weightType";
import VolumeType from "../enums/volumeType";
import { ADD_TO_COUNT_COMPARISON, ADD_TO_VOLUME_COMPARISON, ADD_TO_WEIGHT_COMPARISON } from './actionTypes';
import CalculationType from "../enums/calculationType";

export interface ActionType<T> {
    type: T;
}

export interface CountCompareData {
    count: number,
    price: number
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

export interface ApplicationState {
    calculation: CalculationState,
    history: {type: CalculationType, data: CountCompareData | WeightCompareData | VolumeCompareData }[]
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

export type CalculationAction = AddToWeightComparaisonAction | AddToVolumeComparaisonAction | AddToCountComparaisonAction;

export function appReducer(state: ApplicationState, action: CalculationAction): ApplicationState {
    switch (action.type) {
        case ADD_TO_WEIGHT_COMPARISON:
            return {
                ...state,
                calculation: {
                    ...state.calculation,
                    weight: [...state.calculation.weight, action.data]
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
        default:
            return state;
    }
}