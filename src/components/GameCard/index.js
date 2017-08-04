import React from 'react';
import { Link } from 'react-router';
import timer from '../../services/timer';
import _filter from 'lodash/filter';

import { Card, CardText } from 'react-toolbox/lib/card';

import ROUTES from '../../services/routes';

class Game extends React.Component {
    render() {
        return (
            <Link to={ ROUTES.GAME.getUrl( this.props.game ) }>
                <Card>
                    <CardText>
                        { _filter( this.props.game.players, { active : true } ).length } players remaining<br/>
                        Current blinds: { this.props.game.blinds[ this.props.game.blindLevel ] }<br/>
                        Time remaining: { timer.timeRemainingForBlinds( this.props.game.secondsRemaining ) }
                    </CardText>
                </Card>
            </Link>
        );
    }
}

export default Game;
