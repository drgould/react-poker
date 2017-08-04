import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import timer from '../../services/timer';

class Timer extends React.Component {
    constructor() {
        super();
        const { startTime, elapsedTime, active } = this.props;
        this.state = { startTime, elapsedTime, active };
        this.tickInterval = undefined;

        this.resetTimer = this.resetTimer.bind( this );
        this.tick = this.tick.bind( this );
        this.play = this.play.bind( this );
        this.pause = this.pause.bind( this );
    }

    resetTimer() {
        this.props.onReset();
    }

    tick() {
        if( this.state.active ) {
            const interval = this.props.interval;
            const currentTime = Date.now() / 1000;
            const nextSecondsLeft = interval - ( interval % ( currentTime - this.state.startTime + this.state.elapsedTime ) );
            if( nextSecondsLeft <= 0 ) {
                window.dispatchEvent( new Event( 'blinds-up' ) );
            }
            this.setState( { secondsLeft : this.state.secondsLeft - 1 } );
        }
    }

    play() {
        this.pause();
        this.tickInterval = setInterval( this.tick, 1000 );
    }

    pause() {
        clearInterval( this.tickInterval );
    }

    render() {
        return (
            <Card>
                <CardTitle title="Blinds raise in:" />
                <CardText>
                    <h2>{ timer.timeRemainingForBlinds( this.state.secondsLeft ) }</h2>
                </CardText>
                <CardActions>
                    <Button onClick={ this.play } label="Play" />
                    <Button onClick={ this.pause } label="Pause" />
                    <Button onClick={ this.resetTimer } label="Reset" />
                </CardActions>
            </Card>
        );
    }
}

export default Timer;
