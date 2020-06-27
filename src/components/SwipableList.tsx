import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import DeleteIcon from './card/DeleteIcon';
import Fade from './card/Fade';
import SwipableCard from './card/SwipableCard';

export interface SwipableListElement {
    id: number
    swipeAction: () => void;
    renderFunction: () => JSX.Element;
}

interface SwipableListProps {
    elements: SwipableListElement[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardsContainer: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflowY: "auto",
            position: "absolute"
        },
        cardContainer: {
            width: "100%",
            padding: 10,
            boxSizing: "border-box",
            display: "flex",

        },
        paperStyle: {
            padding: 10,
        }
    }));

const SwipableList: React.FC<SwipableListProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.cardsContainer}>
            <TransitionGroup
                transitionName="course-item"
            >
                {props.elements.map((el) => {
                    return (
                        <Fade
                            in
                            timeout={250}
                            key={el.id}
                        >
                            <div className={classes.cardContainer}>
                                <SwipableCard
                                    swipeDirections={["left"]}
                                    backgroundStyle={{ borderRadius: 4 }}
                                    backgroundColorSwipeLeft={theme.palette.secondary.main}
                                    backgroundColorSwipeRight={theme.palette.secondary.main}
                                    leftActionIcon="Left"
                                    rightActionIcon={<DeleteIcon />}
                                    swipeRightAction={() => {
                                        el.swipeAction()
                                    }}
                                >
                                    <Paper className={classes.paperStyle}>
                                        {el.renderFunction()}
                                    </Paper>
                                </SwipableCard>
                            </div>
                        </Fade>
                    );
                })}
            </TransitionGroup>
        </div>
    )
}

export default SwipableList