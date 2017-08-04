import React from 'react';
import { Link } from 'react-router';
import timer from '../../services/timer';
import _filter from 'lodash/filter';

import { Card, CardText } from 'react-toolbox/lib/card';

import ROUTES from '../../services/routes';

export default ( props ) => (
    <Link to={ ROUTES.GAME.getUrl( props.game ) }>
        <Card>
            <CardText>
                <p>{ _filter( props.game.players, { active : true } ).length } players remaining</p>
                <p>Current blinds: { props.game.blinds[ props.game.blindLevel ] }</p>
                <p>Time remaining: { timer.timeRemainingForBlind( props.game.secondsRemaining ) }</p>
            </CardText>
        </Card>
    </Link>
);
