
'use strict';

import React from 'react';
import timer from '../services/timer';

class Timer extends React.Component {
    constructor(props) {
        this.state = { secondsLeft: props.startingTime };
        this.tickInterval = undefined;

        this.resetTimer = this.resetTimer.bind( this );
        this.tick = this.tick.bind( this );
        this.play = this.play.bind( this );
        this.pause = this.pause.bind( this );
    }

    resetTimer() {
        this.setState( { secondsLeft: this.props.startingTime } );
        this.play();
    }

    tick() {
        let nextSecondsLeft = this.state.secondsLeft - 1;
        if ( nextSecondsLeft === 0 ) {
            this.resetTimer();
            window.dispatchEvent( new Event( 'blinds-up' ) );
        }
        this.setState( { secondsLeft: this.state.secondsLeft - 1 } );
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
            <div className="timer">
                <h2>Blinds raise in:</h2>
                <div className="current-time">{ timer.secondsToTime( this.state.secondsLeft ) }</div>
                <div className="buttons">
                    <button onClick={ this.play }>Play</button>
                    <button onClick={ this.pause }>Pause</button>
                    <button onClick={ this.resetTimer }>Reset</button>
                </div>
            </div>
        );
    }
}

export default Timer;
