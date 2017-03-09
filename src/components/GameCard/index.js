import React from 'react';
import { Link } from 'react-router';
import timer from '../../services/timer';
import _filter from 'lodash/filter';

class Game extends React.Component {
    render() {
        return (
            <Link to={`/game/${this.props.game.key}`}>
                { _filter( this.props.game.players, { active : true } ).length } players remaining<br/>
                Current blind level: { this.props.game.blinds[ this.props.game.blindLevel ] }<br/>
                Time remaining on level: { timer.secondsToTime( this.props.game.secondsRemaining ) }
            </Link>
        );
    }
}

export default Game;
