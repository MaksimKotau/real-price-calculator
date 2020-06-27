import React from 'react';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const DeleteIcon: React.FC<{}> = () => {
    return (
        <div style={{display: "flex", width: 60, height: "100%", alignItems: "center", justifyContent: "center"}}>
            <DeleteSweepIcon style={{color: "white"}}/>
        </div>
    )
}

export default DeleteIcon;