import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CopyrightIcon from "@material-ui/icons/Copyright";
import ThemeIcon from "@material-ui/icons/InvertColors";
import React, { useState } from "react";
import { changeCurrentTheme, useStore } from "../../state/state";
import AboutDialog from "./About";

interface OwnProps {
  anchorEl: HTMLElement | undefined;
  onClose: () => void;
}

const SettingsMenu: React.FC<OwnProps> = (props) => {
  const { state, dispatch } = useStore();
  const { isDark } = state.ui;
  const [showAboutDialog, setShowAboutDialog] = useState<boolean>(false);
  const handleAboutClick = () => {
    setShowAboutDialog(true);
    props.onClose();
  };
  const handleAboutClose = () => {
    setShowAboutDialog(false);
  };
  const handleChangeTheme = () => {
    changeCurrentTheme(dispatch, !isDark);
    props.onClose();
  };

  return (
    <>
      <Menu
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleChangeTheme}>
          <ListItemIcon>
            <ThemeIcon />
          </ListItemIcon>
          <ListItemText>{isDark ? "Light Theme" : "Dark Theme"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAboutClick}>
          <ListItemIcon>
            <CopyrightIcon />
          </ListItemIcon>
          <ListItemText>About</ListItemText>
        </MenuItem>
      </Menu>
      <AboutDialog open={showAboutDialog} onClose={handleAboutClose} />
    </>
  );
};

export default SettingsMenu;
