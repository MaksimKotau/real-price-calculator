import {getWeightMaxId, getWeightMinId} from '../../views/calculatorTabs/WeightTab';
import { WeightCompareData } from '../../state/state';
import WeightType from '../../enums/weightType';

describe('Best-Pire price find', () => {
    describe('Find Weight ID', () => {
        it('find maxWeightID from elements', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: WeightType.gram,
                    count: 200,
                    price: 1.9
                },
                {
                    id: 3,
                    unitType: WeightType.pound,
                    count: 2,
                    price: 6
                }
            ];
            expect(getWeightMaxId(elements)).toEqual(1)
        })
        it('Not search max element in array of one element', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                }
            ];
            expect(getWeightMaxId(elements)).toBeUndefined()
        })
        it('if all real prices the same - return undefined', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: WeightType.gram,
                    count: 200,
                    price: 2
                }
            ];
            expect(getWeightMaxId(elements)).toBeUndefined();
        })
        it('find minWeightID from elements', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: WeightType.gram,
                    count: 200,
                    price: 1.9
                },
                {
                    id: 3,
                    unitType: WeightType.pound,
                    count: 2,
                    price: 6
                }
            ];
            expect(getWeightMinId(elements)).toEqual(3)
        })
        it('Not search min element in array of one element', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                }
            ];
            expect(getWeightMinId(elements)).toBeUndefined()
        })
        it('if all real prices the same - return undefined', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: WeightType.gram,
                    count: 200,
                    price: 2
                }
            ];
            expect(getWeightMinId(elements)).toBeUndefined();
        })
    });
})