import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import { createTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React, { PropsWithChildren } from 'react';
import { useStore } from '../state/state';

const Theme: React.FC<PropsWithChildren<{}>> = (props) => {
    const { state } = useStore();
    const { isDark } = state.ui;
    const theme = createTheme({
        palette: {
            primary: {
                main: teal[800]
            },
            secondary: {
                main: red[500]
            },
            type: isDark ? 'dark' : 'light'
        },
    });
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    )
}

export default Theme;