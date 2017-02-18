'use strict';

import React from 'react';
import Timer from '../components/Timer.js';
import Blinds from '../components/Blinds.js';
import Pot from '../components/Pot.js';
import Debts from '../components/Debts.js';
import db from '../services/db';

import { startingSeconds, payouts, buyIn, smallBlinds } from '../services/variables.js';

class Game extends React.Component {
    componentWillMount() {
        this.gameRef = db.bindState( `/game/${this.props.params.gameId}` );
        window.addEventListener( 'blinds-up', this.handleBlindsUp, false );
    }

    componentWillUnmount() {
        db.removeBinding( this.gameRef );
        window.removeEventListener( 'blinds-up', this.handleBlindsUp, false );
    }

    handleBlindsUp() {
        let body = document.getElementsByTagName( 'body' )[0];
        body.classList.add( 'flashing' );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 1700 );
        setTimeout( function() { body.classList.add( 'flashing' ); }, 1800 );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 3500 );
    }

    render() {
        return (
            <div className="container">
                <div className="col1">
                    <Blinds smallBlinds={ smallBlinds } />
                </div>
                <div className="col2">
                    <Timer startingTime={ startingSeconds } />
                </div>
                <div className="col3">
                    <Pot payouts={ payouts } buyIn={ buyIn } />
                    <Debts />
                </div>
                <div className="clear-both"></div>
            </div>
        );
    }
}

export default Game;
