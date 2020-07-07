import {getWeightMaxId, getWeightMinId} from '../../views/calculatorTabs/WeightTab';
import { WeightCompareData, VolumeCompareData, CountCompareData } from '../../state/state';
import WeightType from '../../enums/weightType';
import VolumeType from '../../enums/volumeType';
import { getVolumeMaxId, getVolumeMinId } from '../../views/calculatorTabs/VolumeTab';
import { getCountMaxId, getCountMinId } from '../../views/calculatorTabs/CountTab';

describe('Best-Pire price find', () => {
    describe('Find Weight ID', () => {
        it('find maxWeightID from elements', () => {
            const elements: WeightCompareData[] = [
                {
                    id: 1,
                    unitType: WeightType.gram,
                    count: 322,
                    price: 1
                },
                {
                    id: 2,
                    unitType: WeightType.gram,
                    count: 2,
                    price: 32
                },
                {
                    id: 3,
                    unitType: WeightType.gram,
                    count: 21,
                    price: 36
                },
                {
                    id: 4,
                    unitType: WeightType.kilogram,
                    count: 1,
                    price: 1001
                },
                {
                    id: 5,
                    unitType: WeightType.gram,
                    count: 1,
                    price: 1
                }
            ];
            expect(getWeightMaxId(elements)).toEqual(2)
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
                },
                {
                    id: 4,
                    unitType: WeightType.gram,
                    count: 100,
                    price: 0.96
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
    describe('Find Volume ID', () => {
        it('find maxVolumeID from elements', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.milliliter,
                    count: 200,
                    price: 3
                },
                {
                    id: 2,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 14
                },
                {
                    id: 3,
                    unitType: VolumeType.gallonUS,
                    count: 1,
                    price: 25
                },
                {
                    id: 4,
                    unitType: VolumeType.pintUS,
                    count: 1,
                    price: 0.6
                },
                {
                    id: 5,
                    unitType: VolumeType.quartUS,
                    count: 1,
                    price: 1
                }
            ];
            expect(getVolumeMaxId(elements)).toEqual(1)
        })
        it('Not search max element in array of one element', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 10
                }
            ];
            expect(getVolumeMaxId(elements)).toBeUndefined()
        })
        it('if all real prices the same - return undefined', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: VolumeType.milliliter,
                    count: 200,
                    price: 2
                }
            ];
            expect(getVolumeMaxId(elements)).toBeUndefined();
        })
        it('find minVolumeID from elements', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.milliliter,
                    count: 200,
                    price: 3
                },
                {
                    id: 2,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 14
                },
                {
                    id: 3,
                    unitType: VolumeType.gallonUS,
                    count: 1,
                    price: 25
                },
                {
                    id: 4,
                    unitType: VolumeType.pintUS,
                    count: 1,
                    price: 0.6
                },
                {
                    id: 5,
                    unitType: VolumeType.quartUS,
                    count: 1,
                    price: 1
                }
            ];
            expect(getVolumeMinId(elements)).toEqual(5)
        })
        it('Not search max element in array of one element', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 10
                }
            ];
            expect(getVolumeMinId(elements)).toBeUndefined()
        })
        it('if all real prices the same - return undefined', () => {
            const elements: VolumeCompareData[] = [
                {
                    id: 1,
                    unitType: VolumeType.liter,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    unitType: VolumeType.milliliter,
                    count: 200,
                    price: 2
                }
            ];
            expect(getVolumeMinId(elements)).toBeUndefined();
        })  
    })
    describe('find Count ID', () => {
        it('find maxCountID from elements', () => {
            const elements: CountCompareData[] = [
                {
                    id: 1,
                    count: 200,
                    price: 3
                },
                {
                    id: 2,
                    count: 1,
                    price: 14
                },
                {
                    id: 3,
                    count: 1,
                    price: 25
                },
            ];
            expect(getCountMaxId(elements)).toEqual(3)
        })
        it('Not search max element in array of one element', () => {
            const elements: CountCompareData[] = [
                {
                    id: 1,
                    count: 1,
                    price: 10
                }
            ];
            expect(getCountMaxId(elements)).toBeUndefined()
        })
        it('if all real prices the same - return undefined', () => {
            const elements: CountCompareData[] = [
                {
                    id: 1,
                    count: 1,
                    price: 10
                },
                {
                    id: 2,
                    count: 2,
                    price: 20
                }
            ];
            expect(getCountMaxId(elements)).toBeUndefined();
        })
        it('find minCountID from elements', () => {
            const elements: CountCompareData[] = [
                {
                    id: 1,
                    count: 200,
                    price: 3
                },
                {
                    id: 2,
                    count: 1,
                    price: 14
                },
                {
                    id: 3,
                    count: 1,
                    price: 25
                },
            ];
            expect(getCountMinId(elements)).toEqual(1)
        })
        it('Not search mшт element in array of one element', () => {
            const elements: CountCompareData[] = [
                {
                    id: 1,
                    count: 1,
                    price: 10
                }
            ];
            expect(getCountMinId(elements)).toBeUndefined()
        })
    })
})