import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import WebFont from 'webfontloader';

import routingConfig from './services/routingConfig';
import './app.css';

WebFont.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

render( <Router routes={routingConfig} history={browserHistory}/>, document.getElementById( 'app' ) );
