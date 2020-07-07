import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React, { useState } from 'react';
import NumberField from '../../components/NumberField';
import WeightType from '../../enums/weightType';
import { addDataToWeightCompareAndHistory, useStore } from '../../state/state';


interface OwnProps {
    isOpen: boolean;
    handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            padding: 15
        },
        formControl: {
            padding: "10px 15% 10px 15%",
            boxSizing: "border-box",
        },
        divRelative: {
            position: "relative",
            padding: "10px 15% 10px 15%",
            boxSizing: "border-box",
        },
        drawerRoot: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        }
    }));

const WeightForm: React.FC<OwnProps> = (props) => {
    const classes = useStyles();
    const [unitType, setUnitType] = useState<WeightType>(WeightType.gram);
    const [productWeight, setProductWeight] = useState<number>(0.0);
    const [productPrice, setProductPrice] = useState<number>(0.0);
    const changeUnitType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUnitType(event.target.value as WeightType);
    }
    const changeProductWeight = (value: number) => {
        setProductWeight(value);
    };
    const changeProductPrice = (value: number) => {
        setProductPrice(value);
    };

    const {dispatch} = useStore()
    const handleAddToCompare = () => {
        addDataToWeightCompareAndHistory(dispatch,{count: productWeight, price: productPrice, unitType, id: (new Date()).getTime()});
        setUnitType(WeightType.gram);
        setProductPrice(0.0);
        setProductWeight(0.0);
        props.handleClose();
    }
    const handleCancel = () => {
        setUnitType(WeightType.gram);
        setProductPrice(0.0);
        setProductWeight(0.0);
        props.handleClose();
    }
    return (
        <SwipeableDrawer
            anchor={"bottom"}
            open={props.isOpen}
            onClose={props.handleClose}
            onOpen={() => { }}
            classes={{
                root: classes.drawerRoot
            }}
        >
            <div className={classes.mainContainer}>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <div className={classes.divRelative}>
                        <InputLabel
                            id="weight-type-label"
                        >
                            Unit type
                        </InputLabel>
                    </div>
                    <Select
                        native
                        value={unitType}
                        variant="outlined"
                        onChange={changeUnitType}
                        labelId="weight-type-label"
                    >
                        <option value={WeightType.gram}>Gram (g)</option>
                        <option value={WeightType.kilogram}>Kilogram (kg)</option>
                        <option value={WeightType.ounce}>Ounce (oz)</option>
                        <option value={WeightType.pound}>Pound (lb)</option>
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <NumberField
                        label="Weight"
                        value={productWeight}
                        onChange={changeProductWeight}
                    />
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <NumberField 
                        value={productPrice}
                        onChange={changeProductPrice}
                        label="Price"
                    />
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddToCompare} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </FormControl>
            </div>
        </SwipeableDrawer>
    )
}

export default WeightForm;