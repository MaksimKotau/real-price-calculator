import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.text.primary,
    },
  })
);

const About: React.FC<OwnProps> = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography variant='h6' component='div'>
          About
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant='subtitle1'>
            This is a simple calculator program for comparing the cost of goods
            for which the price is indicated in different units. Author:&nbsp;
            <a className={classes.link} href='https://maksimkotau.com'>
              Maksim Kotau
            </a>
          </Typography>
          <Typography>{`v. ${process.env.REACT_APP_APPLICATION_VERSION}`}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default About;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});
