'use strict';

import 'react-md/dist/react-md.deep_orange-blue.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import WebFont from 'webfontloader';

import { routes } from './services/routing';


WebFont.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

render( <Router routes={routes}/>, document.getElementById( 'app' ) );
