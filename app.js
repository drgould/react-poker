'use strict';

import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import HomeRoute from './routes/home';
import RoomRoute from './routes/room';
import GameRoute from './routes/game';
import Rebase from 're-base';


render( (
<Router history="{browserHistory}">
    <Route path="/" component={HomeRoute}>
        <Route path="room/:roomId" component={RoomRoute}/>
        <Route path="game/:gameId" component={GameRoute}/>
    </Route>
</Router>
), document.getElementById( 'app' ) );
