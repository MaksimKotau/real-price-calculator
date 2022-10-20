import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';

interface OwnProps {
    onClick: (e: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fabButton: {
            position: "absolute",
            bottom: "7%",
            right: "10%"
        }
    }));

const AddButton: React.FC<OwnProps> = ({ onClick }) => {
    const classes = useStyles()
    return (
        <Fab color="secondary" aria-label="add" onClick={onClick} className={classes.fabButton}>
            <AddIcon />
        </Fab>
    )
}
export default AddButton;