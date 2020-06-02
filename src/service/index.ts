import VolumeType from '../enums/volumeType';
import WeightType from '../enums/weightType';

import * as constants from './constants';

export const ensureNever = (action: never) => action;

export const convertVolume = (from: VolumeType, to: VolumeType, value: number): number => {
    return getVolumeFromLiters(to, getVolumeInLiters(from, value));
}

export const getVolumeInLiters = (unitType: VolumeType, value: number): number => {
    switch (unitType) {
        case VolumeType.gallonUS:
            return value * constants.gallonUSToLiter;
        case VolumeType.milliliter:
            return value * constants.mlToLiter;
        case VolumeType.pintUS:
            return value * constants.pintUSToLiter;
        case VolumeType.quartUS:
            return value * constants.quartUSToLiter;
        case VolumeType.liter:
            return value * constants.literToLiter;
        default:
            ensureNever(unitType);
            return value * constants.literToLiter;
    }
}
export const getVolumeFromLiters = (unitType: VolumeType, value: number): number => {
    switch (unitType) {
        case VolumeType.gallonUS:
            return value * constants.literToGallonUS;
        case VolumeType.milliliter:
            return value * constants.literToMilliliter;
        case VolumeType.pintUS:
            return value * constants.literToPintUS;
        case VolumeType.quartUS:
            return value * constants.literToQuartUS;
        case VolumeType.liter:
            return value * constants.literToLiter;
        default:
            ensureNever(unitType);
            return value * constants.literToLiter;
    }
}

export const getWeightInKilogramms = (unitType: WeightType, value: number): number => {
    switch (unitType) {
        case WeightType.gram:
            return value * constants.grammToKilogramm;
        case WeightType.ounce:
            return value * constants.ouncesToKilogramm;
        case WeightType.pound:
            return value * constants.poundsToKilogramm;
        case WeightType.kilogram:
            return value * constants.kilogrammToKilogramm;
        default:
            ensureNever(unitType);
            return value * constants.kilogrammToKilogramm;
    }
}

export const getWeightFromKilogramms = (unitType: WeightType, value: number): number => {
    switch (unitType) {
        case WeightType.gram:
            return value * constants.kilogrammToGramm;
        case WeightType.ounce:
            return value * constants.kilogrammToOunces;
        case WeightType.pound:
            return value * constants.kilogrammToPounds;
        case WeightType.kilogram:
            return value * constants.kilogrammToKilogramm;
        default:
            ensureNever(unitType);
            return value * constants.kilogrammToKilogramm;
    }
}

export const convertWeight = (from: WeightType, to: WeightType, value: number): number => {
    return getWeightFromKilogramms(to, getWeightInKilogramms(from, value));
}