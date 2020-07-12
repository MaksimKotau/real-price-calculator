import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, MouseEvent } from 'react';
import { isBrowser } from "react-device-detect";
import SwipeableViews from 'react-swipeable-views';
import CalculatorView from './CalculatorView';
import HistoryView from './HistoryView';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsMenu from './menu/SettingsMenu';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default
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
        viewContainer: {
            height: "100%",
            width: "100%"
        }
    }));

const MainView: React.FC<{}> = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [activeHistory, setActiveHistory] = useState<boolean>(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const handleTabChange = (event: any, newValue: number) => {
        setActiveHistory(newValue === 0 ? false : true);
    };
    const handleChangeIndex = (index: number) => {
        setActiveHistory(index === 0 ? false : true);
    };
    const handleMenuIconClick = (event: MouseEvent<HTMLElement, Event>) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setMenuAnchorEl(undefined);
    }
    const tabsArray = [
        <div key="Calculation" dir={theme.direction} className={classes.viewContainer}>
            <CalculatorView />
        </div>,
        <div key="History" dir={theme.direction} className={classes.viewContainer}>
            <HistoryView />
        </div>
    ]
    return (
        <div className={classes.mainContainer}>
            <AppBar position="static">
                <Toolbar className={isBrowser ? classes.desktopToolbar : classes.mobileToolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={handleMenuIconClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Real price calculator
                    </Typography>
                    <IconButton
                        color="inherit"
                    >
                        <MoreIcon/>
                    </IconButton>
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
            <div style={{flex: 1}}>

            
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeHistory ? 1 : 0}
                onChangeIndex={handleChangeIndex}
                containerStyle={{height: "100%"}}
                style={{height: "100%"}}
                disabled
            >
               {tabsArray.map(el => el)}
            </SwipeableViews>
            </div>
            <SettingsMenu 
                anchorEl={menuAnchorEl}
                onClose={handleCloseMenu}
            />
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