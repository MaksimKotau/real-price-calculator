import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import VolumeType from '../../enums/volumeType';
import { useStore, addDataToCountCompareAndHistory } from '../../state/state';


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
    const changeProductCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductCount(parseFloat(event.target.value));
    };
    const changeProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(parseFloat(event.target.value));
    };

    const {dispatch} = useStore()
    const handleAddToCompare = () => {
        addDataToCountCompareAndHistory(dispatch, {count: productCount, price: productPrice, id: (new Date()).getTime()});
        setProductPrice(0.0);
        setProductCount(0.0);
        props.handleClose();
    }
    const handleCancel = () => {
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
                    <TextField
                        variant="outlined"
                        type="number"
                        inputProps={{ inputMode: 'numeric' }}
                        label="Count"
                        value={productCount}
                        onChange={changeProductCount}
                    />
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    fullWidth
                >
                    <TextField
                        variant="outlined"
                        type="number"
                        inputProps={{ inputMode: 'numeric' }}
                        label="Price"
                        value={productPrice}
                        onChange={changeProductPrice}
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

export default CountForm;