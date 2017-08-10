import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import WebFont from 'webfontloader';
import routingConfig from "./services/routingConfig";

import '../node_modules/spectre.css/spectre.less';
import '../node_modules/spectre.css/spectre-icons.less';
import './variables.less';
import './app.less';

WebFont.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

render( <Router routes={ routingConfig } history={ browserHistory } />, document.getElementById( 'app' ) );
