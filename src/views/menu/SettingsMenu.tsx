import React from 'react';
import { useStore } from '../../state/state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import ThemeIcon from '@material-ui/icons/InvertColors';
import {changeCurrentTheme} from '../../state/state';

interface OwnProps {
    anchorEl: HTMLElement | undefined;
    onClose: () => void
}

const SettingsMenu: React.FC<OwnProps> = (props) => {
    const { state, dispatch } = useStore();
    const { isDark } = state.ui;
    const handleChangeTheme = () => {
        changeCurrentTheme(dispatch, !isDark);
        props.onClose();
    }
    return (
        <Menu
            id="simple-menu"
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
                    <ThemeIcon />
                </ListItemIcon>
                <ListItemText>
                    {isDark ? "Light Theme" : "Dark Theme"}
                </ListItemText>
            </MenuItem>
        </Menu>
    );
}

export default SettingsMenu;