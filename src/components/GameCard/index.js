import React from 'react';
import { Link } from 'react-router';
import timer from '../../services/timer';

import ROUTES from '../../services/routes';

export default ( props ) => (
    <Link to={ ROUTES.GAME.getUrl( props.game ) }>
        <Card>
            <CardText>
                <p>{ props.game.players.filter( player => player.active ).length } players remaining</p>
                <p>Current blinds: { props.game.blinds[ props.game.blindLevel ] }</p>
                <p>Time remaining: { timer.timeRemainingForBlind( props.game.secondsRemaining ) }</p>
            </CardText>
        </Card>
    </Link>
);
