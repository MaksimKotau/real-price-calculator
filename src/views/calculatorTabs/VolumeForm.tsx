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
import VolumeType from '../../enums/volumeType';
import { addDataToVolumeCompareAndHistory, useStore } from '../../state/state';


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

const VolumeForm: React.FC<OwnProps> = (props) => {
    const classes = useStyles();
    const [unitType, setUnitType] = useState<VolumeType>(VolumeType.milliliter);
    const [productVolume, setProductVolume] = useState<number>(0.0);
    const [productPrice, setProductPrice] = useState<number>(0.0);
    const [showVolumeError, setShowVolumeError] = useState<boolean>(false);
    const [showPriceError, setShowPriceError] = useState<boolean>(false);
    const [isPriceValid, setIsPriceValid] = useState<boolean>(false);
    const [isVolumeValid, setIsVolumeValid] = useState<boolean>(false);
    const changeUnitType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUnitType(event.target.value as VolumeType);
    }
    const changeProductVolume = (value: number) => {
        setProductVolume(value);
        setShowVolumeError(true);
    };
    const changeProductPrice = (value: number) => {
        setProductPrice(value);
        setShowPriceError(true);
    };

    const { dispatch } = useStore()
    const handleAddToCompare = () => {
        addDataToVolumeCompareAndHistory(dispatch, { count: productVolume, price: productPrice, unitType, id: (new Date()).getTime() });
        setUnitType(VolumeType.milliliter);
        setProductPrice(0.0);
        setProductVolume(0.0);
        props.handleClose();
    }
    const handleCancel = () => {
        setUnitType(VolumeType.milliliter);
        setProductPrice(0.0);
        setProductVolume(0.0);
        props.handleClose();
    }
    const handleVolumeValidationChange = (result: boolean) => {
        setIsVolumeValid(result);
    }
    const handlePriceValidationChange = (result: boolean) => {
        setIsPriceValid(result);
    }
    const validateByScheme = (value: number): string | null => {
        if (value <= 0) {
            return "Filed value must be more than 0"
        } else {
            return null
        }
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
                            id="volume-type-label"
                        >
                            Unit type
                        </InputLabel>
                    </div>
                    <Select
                        native
                        value={unitType}
                        variant="outlined"
                        onChange={changeUnitType}
                        labelId="volume-type-label"
                    >
                        <option value={VolumeType.milliliter}>Milliliter (ml)</option>
                        <option value={VolumeType.liter}>Liter (l)</option>
                        <option value={VolumeType.pintUS}>Pint US (pt)</option>
                        <option value={VolumeType.quartUS}>Quart US (qt)</option>
                        <option value={VolumeType.gallonUS}>Gallon US (gal)</option>
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <NumberField
                        label="Volume"
                        value={productVolume}
                        onChange={changeProductVolume}
                        validateByScheme={validateByScheme}
                        showErrors={showVolumeError}
                        onValidationResultChange={handleVolumeValidationChange}
                    />
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <NumberField
                        label="Price"
                        value={productPrice}
                        onChange={changeProductPrice}
                        showErrors={showPriceError}
                        validateByScheme={validateByScheme}
                        onValidationResultChange={handlePriceValidationChange}
                    />
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <DialogActions>
                        <Button onClick={handleCancel} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddToCompare}
                            color="secondary"
                            variant="contained"
                            disabled={!isPriceValid || !isVolumeValid}
                        >
                            Add
                        </Button>
                    </DialogActions>
                </FormControl>
            </div>
        </SwipeableDrawer>
    )
}

export default VolumeForm;