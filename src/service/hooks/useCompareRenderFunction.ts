import CalculationType from '../../enums/calculationType';
import {renderWeightElement} from '../../views/calculatorTabs/WeightTab';
import {renderVolumeElement} from '../../views/calculatorTabs/VolumeTab';
import {renderCountElement} from '../../views/calculatorTabs/CountTab';

export const useCompareRenderFunction = (type: CalculationType | null) => {
    switch(type){
        case CalculationType.WEIGHT:
            return renderWeightElement;
        case CalculationType.VOLUME:
            return renderVolumeElement;
        case CalculationType.COUNT:
            return renderCountElement;
        default:
            return 
    }
}