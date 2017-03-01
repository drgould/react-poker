import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from './Header';

export default class AppFrame extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme( lightBaseTheme )}>
                <div>
                    <Header/>
                    { this.props.children }
                </div>
            </MuiThemeProvider>
        )
    }
};
