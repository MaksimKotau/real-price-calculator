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
import useTheme from '@material-ui/core/styles/useTheme';

interface OwnProps {
    currentTab: CalculationType;
    onTabChange: (tab: CalculationType) => void;
}

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
        },
        bottomNavigation: {
            alignSelf: "flex-end",
            width: "100%",
            backgroundColor: theme.palette.primary.main
        },
        bottomNavigationColor: {
            color: theme.palette.primary.dark,
        },
        bottomNavigationActiveColor: {
            color: "white"
        }

    }));

const CalculatorView: React.FC<OwnProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const handleChange = (event: any, newValue: CalculationType) => {
        props.onTabChange(newValue);
    };
    return (
        <div className={classes.container}>
            <div className={classes.calculationContainer}>
                {props.currentTab === CalculationType.COUNT && <CountTab />}
                {props.currentTab === CalculationType.WEIGHT && <WeightTab />}
                {props.currentTab === CalculationType.VOLUME && <VolumeTab />}
            </div>

            <BottomNavigation value={props.currentTab} onChange={handleChange} className={classes.bottomNavigation} showLabels>
                <BottomNavigationAction
                    label="Weight"
                    value={CalculationType.WEIGHT}
                    icon={<WeightIcon style={{ color: props.currentTab === CalculationType.WEIGHT ? "white" : theme.palette.action.disabled }} />}
                    classes={{
                        root: classes.bottomNavigation,
                        selected: classes.bottomNavigationActiveColor
                    }}
                />
                <BottomNavigationAction
                    label="Volume"
                    value={CalculationType.VOLUME}
                    icon={<VolumeIcon style={{ color: props.currentTab === CalculationType.VOLUME ? "white" : theme.palette.action.disabled }} />}
                    classes={{
                        root: classes.bottomNavigation,
                        selected: classes.bottomNavigationActiveColor
                    }}
                />
                <BottomNavigationAction
                    label="Count"
                    value={CalculationType.COUNT}
                    icon={<CountIcon style={{ color: props.currentTab === CalculationType.COUNT ? "white" : theme.palette.action.disabled }} />}
                    classes={{
                        root: classes.bottomNavigation,
                        selected: classes.bottomNavigationActiveColor
                    }}
                />
            </BottomNavigation>

        </div>
    )
}

export default CalculatorView;