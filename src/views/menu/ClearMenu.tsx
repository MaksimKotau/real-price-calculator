import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import ClearAllIcon from '@material-ui/icons/ClearAll';

interface OwnProps {
    anchorEl: HTMLElement | undefined;
    onClose: () => void;
    clearAction: () => void;
    clearLabel: string;
}

const ClearMenu: React.FC<OwnProps> = (props) => {
    const handleChangeTheme = () => {
        props.clearAction();
        props.onClose();
    }
    return (
        <Menu
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
        >
            <MenuItem onClick={handleChangeTheme}>
                <ListItemIcon>
                    <ClearAllIcon />
                </ListItemIcon>
                <ListItemText>
                    {props.clearLabel}
                </ListItemText>
            </MenuItem>
        </Menu>
    );
}

export default ClearMenu;