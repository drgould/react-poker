import { Component } from 'react';
import { Link } from 'react-router';
import timer from '../services/timer';

class Game extends Component {
    render() {
        return (
            <Link to={`/game/${this.props.game.id}`}>
                { this.props.game.activePlayers } players remaining<br/>
                Current blind level: { this.room.blinds[ this.props.game.blind ] }<br/>
                Time remaining on level: { timer.secondsToTime( this.props.game.secondsRemainingInLevel ) }
                Started { this.props.game.startTime }
            </Link>
        );
    }
}

export default Game;