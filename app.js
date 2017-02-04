'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomeRoute from './routes/home';
import RoomRoute from './routes/room';
import GameRoute from './routes/game';

render( (
<Router history={hashHistory}>
    <Route path="/" component={HomeRoute}/>
    <Route path="/room/:roomId" component={RoomRoute}/>
    <Route path="/game/:gameId" component={GameRoute}/>
</Router>
), document.getElementById( 'app' ) );
