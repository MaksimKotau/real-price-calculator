import React, { MouseEvent } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

interface OwnProps {
  anchorEl: HTMLElement | undefined;
  onClose: () => void;
  clearAction: () => void;
  clearLabel: string;
  clearIcon: JSX.Element;
}

const ClearMenu: React.FC<OwnProps> = (props) => {
  const handleClick = (event: MouseEvent<HTMLElement, Event>) => {
    event.stopPropagation();
    event.preventDefault();
    props.clearAction();
    props.onClose();
  };
  return (
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
      <MenuItem onClick={handleClick}>
        <ListItemIcon>{props.clearIcon}</ListItemIcon>
        <ListItemText>{props.clearLabel}</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ClearMenu;
