import {getVolumeInLiters, getVolumeFromLiters, convertVolume, convertWeight, getWeightFromKilogramms, getWeightInKilogramms} from '../index';
import VolumeType from '../../enums/volumeType';
import WeightType from '../../enums/weightType';

describe('test volume conversion', () => {
    describe('Convert difference values to liters', () => {
        it('should convert gallonUS to liters', () => {
            const gallonsCount = 2;
            const expectedLitersCount = 7.570823568;
            expect(getVolumeInLiters(VolumeType.gallonUS, gallonsCount)).toBeCloseTo(expectedLitersCount, 7);
        })
        it('should convert milliliters to liters', () => {
            const millilitersCount = 3000;
            const expectedLitersCount = 3;
            expect(getVolumeInLiters(VolumeType.milliliter, millilitersCount)).toBeCloseTo(expectedLitersCount, 7);
        })
        it('should convert pintUS to liters', () => {
            const pintsCount = 5;
            const expectedLitersCount = 2.365882365;
            expect(getVolumeInLiters(VolumeType.pintUS, pintsCount)).toBeCloseTo(expectedLitersCount, 7);
        })
        it('should convert quartUS to liters', () => {
            const quartsCount = 4;
            const expectedLitersCount = 3.785411784;
            expect(getVolumeInLiters(VolumeType.quartUS, quartsCount)).toBeCloseTo(expectedLitersCount, 7);
        })
        it('should convert liters to liters', () => {
            const litersCount = 10;
            const expectedLitersCount = 10;
            expect(getVolumeInLiters(VolumeType.liter, litersCount)).toBeCloseTo(expectedLitersCount, 7);
        })
    })
    describe('Convert liters to different values', () => {
        it('should convert liters to gallonUS', () => {
            const litersCount = 2;
            const expectedGallonsCount = 0.5283441047;
            expect(getVolumeFromLiters(VolumeType.gallonUS, litersCount)).toBeCloseTo(expectedGallonsCount, 7);
        })
        it('should convert liters to milliliters', () => {
            const litersCount = 3;
            const expectedMillilitersCount = 3000;
            expect(getVolumeFromLiters(VolumeType.milliliter, litersCount)).toBeCloseTo(expectedMillilitersCount, 7);
        })
        it('should convert liters to pintUS', () => {
            const litersCount = 5;
            const expectedPintsCount = 10.566882094;
            expect(getVolumeFromLiters(VolumeType.pintUS, litersCount)).toBeCloseTo(expectedPintsCount, 7);
        })
        it('should convert liters to quartUS', () => {
            const litersCount = 3;
            const expectedQuartsCount = 3.1700646283;
            expect(getVolumeFromLiters(VolumeType.quartUS, litersCount)).toBeCloseTo(expectedQuartsCount, 7);
        })
        it('should convert liters to liters', () => {
            const litersCount = 2;
            const expectedlitersCount = 2;
            expect(getVolumeFromLiters(VolumeType.liter, litersCount)).toBeCloseTo(expectedlitersCount, 7);
        })
    })
    describe('convert volume from - to different unit types', () => {
        it('should convert QuartUS to Milliliters', () => {
            const quartsCount = 15;
            const expectedMillilitersCount = 14195.29419;
            expect(convertVolume(VolumeType.quartUS, VolumeType.milliliter, quartsCount)).toBeCloseTo(expectedMillilitersCount, 7);
        })
        it('should convert GallonUS to PintUS', () => {
            const gallonsCount = 7;
            const expectedPintsCount = 56;
            expect(convertVolume(VolumeType.gallonUS, VolumeType.pintUS, gallonsCount)).toBeCloseTo(expectedPintsCount, 7);
        })
        it('should convert Liters to Liters', () => {
            const litersCount = 254;
            const expectedLitersCount = 254;
            expect(convertVolume(VolumeType.liter, VolumeType.liter, litersCount)).toBeCloseTo(expectedLitersCount, 7);
        })
        it('should convert Quart to Gallons', () => {
            const quartCount = 11;
            const expectedGallonsCount = 2.75;
            expect(convertVolume(VolumeType.quartUS, VolumeType.gallonUS, quartCount)).toBeCloseTo(expectedGallonsCount, 7);
        })
    })
})
describe('test weight conversion', () => {
    describe('Convert difference weights to kilograms', () => {
        it('should convert grams to kilograms', () => {
            const gramCount = 3500;
            const expectedKilogramCount = 3.5;
            expect(getWeightInKilogramms(WeightType.gram, gramCount)).toBeCloseTo(expectedKilogramCount, 7)
        })
        it('should convert ounces to kilograms', () => {
            const ouncesCount = 50;
            const expectedKilogramCount = 1.4174761563;
            expect(getWeightInKilogramms(WeightType.ounce, ouncesCount)).toBeCloseTo(expectedKilogramCount, 7)
        })
        it('should convert pounds to kilograms', () => {
            const poundsCount = 10;
            const expectedKilogramCount = 4.5359237;
            expect(getWeightInKilogramms(WeightType.pound, poundsCount)).toBeCloseTo(expectedKilogramCount, 7)
        })
        it('should convert kilograms to kilograms', () => {
            const kilogramCount = 15;
            const expectedKilogramCount = 15;
            expect(getWeightInKilogramms(WeightType.kilogram, kilogramCount)).toBeCloseTo(expectedKilogramCount, 7)
        })
    })
    describe('Convert kilograms to different weight units', () => {
        it('should convert kilograms to grams', () => {
            const kilogramCount = 3.6;
            const expectedGramCount = 3600;
            expect(getWeightFromKilogramms(WeightType.gram, kilogramCount)).toBeCloseTo(expectedGramCount, 7);
        })
        it('should convert kilograms to ounces', () => {
            const kilogramCount = 0.5;
            const expectedOunceCount = 17.636980975;
            expect(getWeightFromKilogramms(WeightType.ounce, kilogramCount)).toBeCloseTo(expectedOunceCount, 7);
        })
        it('should convert kilograms to pounds', () => {
            const kilogramCount = 4.7;
            const expectedPoundCount = 10.361726323;
            expect(getWeightFromKilogramms(WeightType.pound, kilogramCount)).toBeCloseTo(expectedPoundCount, 7);
        })
        it('should convert kilograms to kilograms', () => {
            const kilogramCount = 5.4;
            const expectedKilogramCount = 5.4;
            expect(getWeightFromKilogramms(WeightType.kilogram, kilogramCount)).toBeCloseTo(expectedKilogramCount, 7);
        })
    })
    describe('Convert Weight from - to different unit types', () => {
        it('should convert grams to ounces', () => {
            const gramsCount = 345.7;
            const expectedOuncesCount = 12.194208646;
            expect(convertWeight(WeightType.gram, WeightType.ounce, gramsCount)).toBeCloseTo(expectedOuncesCount, 7)
        })
        it('should convert ounces to pounds', () => {
            const ouncesCount = 3.24;
            const expectedPoundsCount = 0.2025;
            expect(convertWeight(WeightType.ounce, WeightType.pound, ouncesCount)).toBeCloseTo(expectedPoundsCount, 7)
        })
        it('should convert grams to grams', () => {
            const gramsCount = 2548;
            const expectedGramsCount = 2548;
            expect(convertWeight(WeightType.gram, WeightType.gram, gramsCount)).toBeCloseTo(expectedGramsCount, 7)
        })
        it('should convert kilogram to kilogram', () => {
            const kilogramsCount = 3.254;
            const expectedKilogramsCount = 3.254;
            expect(convertWeight(WeightType.kilogram, WeightType.kilogram, kilogramsCount)).toBeCloseTo(expectedKilogramsCount, 7)
        })
    })
})