'use strict';

import React from 'react';
import GameComponent from '../components/Game';
import db from '../services/db';
import * as vars from '../services/variables';
import _clone from 'lodash/clone';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _pull from 'lodash/pull';
import _last from 'lodash/last';
import _extend from 'lodash/extend';

const defaultGame = {
    buyIn : vars.buyIn,
    secondsPerLevel : vars.startingSeconds,
    blinds : _clone( vars.smallBlinds ),
    payoutLevels : _clone( vars.payoutLevels ),
    inProgress : true,
    blindLevel : 0,
    secondsRemaining : 0,
    players : []
};

function transformInputValue( input ) {
    switch( input.name ) {
        case 'secondsPerLevel':
            return input.value * 60;
        default:
            return input.value;
    }
}

class Room extends React.Component {
    constructor() {
        this.state = {
            room : {},
            games : [],
            newGame : _clone( defaultGame ),
            newSmallBlind : _last( vars.smallBlinds ) * 2
        };
    }
    componentWillMount() {
        this.state.newGame.roomId = this.props.params.roomId;
    }
    componentDidMount() {
        this.roomRef = db.bindToState( `rooms/${this.props.params.roomId}`, {
            context : this,
            state : 'room'
        } );
        this.gamesRef = db.syncState( 'games', {
            context : this,
            state : 'games',
            asArray : true,
            queries : {
                orderByChild : 'roomId',
                equalTo : this.props.params.roomId
            }
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomRef );
        db.removeBinding( this.gamesRef );
    }
    getGames( inProgress ) {
        const games = _filter( this.state.games, { inProgress } );
        if( games.length ) {
            return _map( games, ( game, index ) => <li key={index}><GameComponent game={game}/></li> );
        }
        return ( <li>No Games</li> );
    }

    removeBlind( blind ) {
        _pull( this.state.newGame.blinds, blind );
        this.setState( { newGame : this.state.newGame } );
    }

    getBlinds() {
        return _map( this.state.newGame.blinds, ( blind, index ) => (
            <li key={index}>
                { blind } / { blind * 2 }
                <button onClick={ () => this.removeBlind( blind ) }>Remove</button>
            </li> )
        );
    }

    handleNewGameInputChange( ev ) {
        this.state.newGame[ ev.target.name ] = transformInputValue( ev.target );
        this.setState( { newGame : this.state.newGame } );
    }

    handleNewBlindChange( ev ) {
        this.setState( {
            newSmallBlind : ev.target.value
        } );
    }

    addBlind( ev ) {
        ev.preventDefault();
        this.state.newGame.blinds.push( this.state.newSmallBlind );
        this.state.newGame.blinds.sort( ( a, b ) => a - b );
        this.setState( { newGame : this.state.newGame } );
    }

    createGame( ev ) {
        ev.preventDefault();
        this.setState( {
            games : this.state.games.concat( _clone( this.state.newGame ) ),
            newGame : _clone( defaultGame )
        } );
    }

    render() {
        return (
            <div>
                <h2>{ this.state.room.name }</h2>

                <form>
                    <div>
                        <label>
                            Buy in:
                            $<input type="number" name="buyIn" value={this.state.newGame.buyIn} onChange={ this.handleNewGameInputChange.bind( this ) }/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Minutes per level:
                            <input type="number" name="secondsPerLevel" value={this.state.newGame.secondsPerLevel / 60} onChange={ this.handleNewGameInputChange.bind( this ) }/>
                        </label>
                    </div>
                    <div>
                        <h4>Blinds</h4>
                        <ul>
                            { this.getBlinds() }
                            <li>
                                <input type="number" value={this.state.newSmallBlind} onChange={ this.handleNewBlindChange.bind( this ) } />
                                / { this.state.newSmallBlind * 2 }
                                <button type="button" onClick={ this.addBlind.bind( this ) }>Add</button>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" onClick={ this.createGame.bind( this ) }>Create Game</button>
                </form>
                <h4>Games</h4>
                <h5>Current</h5>
                <ul>{ this.getGames( true ) }</ul>
                <h5>Finished</h5>
                <ul>{ this.getGames( false ) }</ul>
            </div>
        );
    }
}

export default Room;
