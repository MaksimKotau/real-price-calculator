import React, { useState } from 'react';
import AddButton from '../../components/AddButton';
import WeightForm from './WeightForm';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withLocalStorageCache, getInitialState } from '../../state/utils';
import { appReducer, ApplicationState } from '../../state/state';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import WeightType from '../../enums/weightType';
import { convertWeight } from '../../service/index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardsContainer: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflowY: "auto",
            position: "absolute"
        },
        cardContainer: {
            width: "100%",
            padding: 10,
            boxSizing: "border-box"
        }
    }));

const WeightTab: React.FC<{}> = () => {
    const classes = useStyles();
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const [state, dispatch] = React.useReducer(
        withLocalStorageCache(appReducer),
        getInitialState()
    )
    const getPriceBy100g = (unitType: WeightType, count: number, price: number): number => {
        const priceForOneUnit = price / count;
        const conversionCoefficient = convertWeight(WeightType.gram, unitType, 1);
        const priceFor_1g = priceForOneUnit * conversionCoefficient;
        return priceFor_1g * 100;
    }
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div className={classes.cardsContainer}>
                {(state as ApplicationState).calculation.weight.map((el, index) => {
                    return (
                        <div className={classes.cardContainer}>
                            <Paper>
                                <Typography variant="subtitle2">{`Units: ${el.unitType}`}</Typography>
                                <Typography variant="subtitle2">{`Weight: ${el.count}`}</Typography>
                                <Typography variant="subtitle2">{`Price: ${el.price}`}</Typography>
                                <Typography variant="subtitle2">{`REAL PRICE FOR 100g: ${getPriceBy100g(el.unitType, el.count, el.price)}`}</Typography>
                            </Paper>
                        </div>
                    );
                })}
            </div>
            <AddButton onClick={() => setFormOpen(true)} />
            <WeightForm
                isOpen={isFormOpen}
                handleClose={() => setFormOpen(false)}
            />
        </div>
    )
}

export default WeightTab;