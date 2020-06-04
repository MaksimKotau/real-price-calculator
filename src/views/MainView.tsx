import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import CalculatorView from './CalculatorView';
import SwipeableViews from 'react-swipeable-views';
import {

    isBrowser,
    isMobile,
    isTablet
} from "react-device-detect";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        mobileToolbar: {
            minHeight: 128,
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        desktopToolbar: {
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            alignSelf: 'flex-start',
            marginTop: 7
        },
    }));

const MainView: React.FC<{}> = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [activeHistory, setActiveHistory] = useState<boolean>(false);
    const handleTabChange = (event: any, newValue: number) => {
        setActiveHistory(newValue === 0 ? false : true);
    };
    const handleChangeIndex = (index: number) => {
        setActiveHistory(index === 0 ? false : true);
    };
    return (
        <div className={classes.mainContainer}>
            <AppBar position="static">
                <Toolbar className={isBrowser ? classes.desktopToolbar : classes.mobileToolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Real price calculator
                    </Typography>
                </Toolbar>
                <Tabs
                    value={activeHistory ? 1 : 0}
                    onChange={handleTabChange}
                    aria-label="switching between calculating and hitory view"
                    variant="fullWidth"
                >
                    <Tab label="Compare Price" {...a11yProps(0)} />
                    <Tab label="History" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeHistory ? 1 : 0}
                onChangeIndex={handleChangeIndex}
                containerStyle={{height: "100%"}}
                style={{height: "100%"}}
            >
                <TabPanel value={0} index={0} dir={theme.direction} style={{height: "100%"}}>
                    <CalculatorView />
                </TabPanel>
                <TabPanel value={1} index={1} dir={theme.direction}>
                    History
                </TabPanel>
            </SwipeableViews>
        </div >
    )
}
export default MainView;

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index === 0 ? "calculate" : "hystory"}`,
        'aria-controls': `simple-tabpanel-${index === 0 ? "calculate" : "hystory"}`,
    };
}

function TabPanel(props : any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{height: "100%"}}
        >
            {value === index && (
                <div style={{height: "100%"}}>
                    {children}
                </div>
            )}
        </div>
    );
}