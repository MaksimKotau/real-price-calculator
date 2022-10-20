import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React, { useState } from 'react';
import NumberField from '../../components/NumberField';
import { addDataToCountCompareAndHistory, useStore } from '../../state/state';


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

const CountForm: React.FC<OwnProps> = (props) => {
    const classes = useStyles();
    const [productCount, setProductCount] = useState<number>(0.0);
    const [productPrice, setProductPrice] = useState<number>(0.0);
    const [showCountError, setShowCountError] = useState<boolean>(false);
    const [showPriceError, setShowPriceError] = useState<boolean>(false);
    const [isPriceValid, setIsPriceValid] = useState<boolean>(false);
    const [isCountValid, setIsCountValid] = useState<boolean>(false);
    const changeProductCount = (value: number) => {
        setProductCount(value);
        setShowCountError(true);
    };
    const changeProductPrice = (value: number) => {
        setProductPrice(value);
        setShowPriceError(true);
    };

    const { dispatch } = useStore()
    const handleAddToCompare = () => {
        addDataToCountCompareAndHistory(dispatch, { count: productCount, price: productPrice, id: (new Date()).getTime() });
        setProductPrice(0.0);
        setProductCount(0.0);
        props.handleClose();
    }
    const handleCancel = () => {
        setProductPrice(0.0);
        setProductCount(0.0);
        props.handleClose();
    }
    const handleCountValidationChange = (result: boolean) => {
        setIsCountValid(result);
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
                    <NumberField
                        label="Count"
                        value={productCount}
                        onChange={changeProductCount}
                        validateByScheme={validateByScheme}
                        showErrors={showCountError}
                        onValidationResultChange={handleCountValidationChange}
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
                            disabled={!isPriceValid || !isCountValid}
                        >
                            Add
                        </Button>
                    </DialogActions>
                </FormControl>
            </div>
        </SwipeableDrawer>
    )
}

export default CountForm;