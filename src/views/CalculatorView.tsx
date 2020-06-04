import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalculationType from '../enums/calculationType';
import WeightIcon from '@material-ui/icons/FitnessCenter';
import VolumeIcon from '@material-ui/icons/LocalDrink';
import CountIcon from '@material-ui/icons/GroupWork';
import CountTab from './calculatorTabs/CountTab';
import VolumeTab from './calculatorTabs/VolumeTab';
import WeightTab from './calculatorTabs/WeightTab';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        calculationContainer: {
            width: "100%",
            flex: 1
        }
    }));

const CalculatorView: React.FC<{}> = () => {
    const [currentTab, setCurrentTab] = useState<CalculationType>(CalculationType.WEIGHT);
    const classes = useStyles();
    const handleChange = (event: any, newValue: CalculationType) => {
        setCurrentTab(newValue);
      };
    return (
        <div className={classes.container}>
            <div className={classes.calculationContainer}>
                {currentTab === CalculationType.COUNT && <CountTab />}
                {currentTab === CalculationType.WEIGHT && <WeightTab />}
                {currentTab === CalculationType.VOLUME && <VolumeTab />}
            </div>

            <BottomNavigation  value={currentTab} onChange={handleChange} style={{alignSelf: "flex-end", width: "100%"}}>
                <BottomNavigationAction label="Weight" value={CalculationType.WEIGHT} icon={<WeightIcon />} />
                <BottomNavigationAction label="Volume" value={CalculationType.VOLUME} icon={<VolumeIcon />} />
                <BottomNavigationAction label="Count" value={CalculationType.COUNT} icon={<CountIcon />} />
            </BottomNavigation>

        </div>
    )
}

export default CalculatorView;