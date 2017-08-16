import React from 'react';
import { Link } from 'react-router';

import Timer from '../../components/Timer';
import Blinds from '../../components/Blinds';
import Players from '../../components/Players';
import Payouts from '../../components/Payouts';
import Pot from '../../components/Pot';
import db from '../../services/db';
import { authState } from '../../services/auth';
import ROUTES from '../../services/routes';

import './styles.less';
import { defaultPlayer } from "../../services/variables";
import { getCurrentTime, totalSecondsPlayed } from "../../services/timer";

function transformGameInputValue( input ) {
    switch( input.name ) {
        case 'secondsPerLevel':
            return input.value * 60;
        default:
            return input.value;
    }
}

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            game : undefined,
        };

        this._forceUpdate = () => this.forceUpdate();

        this.events = {
            'raise-blinds' : () => this.changeBlinds( true ),
            'lower-blinds' : () => this.changeBlinds( false ),
            'start-clock' : () => this.toggleGameRunning(),
            'pause-clock' : () => this.toggleGameRunning(),
            'reset-clock' : () => this.resetClock(),
            'auth-state-change' : this._forceUpdate,
            'cash-buy-in' : () => this.buyIn( true ),
            'venmo-buy-in' : () => this.buyIn( false ),
        }
    }

    componentWillMount() {
        const tokens = this.props.params.gameId.split( '_' );
        const roomId = tokens.slice( 0, -1 );
        const gameId = tokens.slice( -1 );
        this.gamePath = `${ roomId }/${ gameId }`;
        db.bindToState(
            `/games/${ this.gamePath }`,
            {
                context : this,
                state : 'game',
            },
        );
        db.bindToState(
            `/players/${ this.gamePath }`,
            {
                context : this,
                state : 'players',
            }
        );
        this.interval = setInterval( this._forceUpdate, 1000 );
        for( const event in this.events ) {
            window.addEventListener( event, this.events[ event ], false );
        }
    }

    componentWillUnmount() {
        clearInterval( this.interval );
        for( const event in this.events ) {
            window.removeEventListener( event, this.events[ event ], false );
        }
    }

    handleBlindsUp() {
        let body = document.getElementsByTagName( 'body' )[0];
        body.classList.add( 'flashing' );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 1700 );
        setTimeout( function() { body.classList.add( 'flashing' ); }, 1800 );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 3500 );
    }

    changeBlinds( up ) {
        const { options : { interval } } = this.state.game;
        let { startTime, elapsedTime, active } = this.state.game.state;

        elapsedTime = totalSecondsPlayed( startTime, elapsedTime, active );
        elapsedTime = Math.max( 0, elapsedTime + ( interval * ( up ? 1 : -1 ) ) );
        startTime = getCurrentTime();

        this._updateGameState( { elapsedTime, startTime } );
    }

    handleNewGameInputChange( ev ) {
        this.state.newGame[ ev.target.name ] = transformGameInputValue( ev.target );
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

    joinGame() {
        db.post( `/players/${ this.gamePath }/${ authState.user.uid }`, { data : defaultPlayer } );
        const activePlayers = this.state.game.state.activePlayers + 1;
        this._updateGameState( { activePlayers } );
    }

    buyIn( cash ) {
        const gameState = this.state.game.state;
        const secondsPlayed = totalSecondsPlayed( gameState.startTime, gameState.elapsedTime, gameState.active );
        const buyIns = this.state.players[ authState.user.uid ].buyIns || {};

        buyIns.cash = buyIns.cash || [];
        buyIns.venmo = buyIns.venmo || [];
        buyIns[ cash ? 'cash' : 'venmo' ].push( secondsPlayed );
        db.update( `/players/${ this.gamePath }/${ authState.user.uid }`, { data: { buyIns } } );

        const prop = cash ? 'cashBuyIns' : 'venmoBuyIns';
        const data = {};
        data[ prop ] = gameState[ prop ] + 1;

        this._updateGameState( data );
    }

    toggleGameRunning() {
        let { active, startTime, elapsedTime } = this.state.game.state;
        const currentTime = getCurrentTime();
        if( active ) {
            if( startTime ) {
                elapsedTime += currentTime - startTime;
            }
        } else {
            startTime = currentTime;
        }
        active = !active;

        this._updateGameState( { startTime, elapsedTime, active } );
    }

    resetClock() {
        const { options : { interval } } = this.state.game;
        let { startTime, elapsedTime, active } = this.state.game.state;

        elapsedTime = totalSecondsPlayed( startTime, elapsedTime, active );
        elapsedTime = Math.floor( elapsedTime / interval ) * interval;
        startTime = getCurrentTime();

        this._updateGameState( { elapsedTime, startTime } );
    }

    _updateGameState( state ) {
        db.update( `/games/${ this.gamePath }/state`, { data : state } );
    }

    // gameEditor() {
    //     return (
    //         <Card>
    //             <CardTitle title="Create a Game"/>
    //             <CardText>
    //                 <div>
    //                     $<Input
    //                     type="number"
    //                     name="buyIn"
    //                     value={this.state.newGame.buyIn}
    //                     floatingLabelText="Buy In Amount"
    //                     onChange={ this.handleNewGameInputChange.bind( this ) }/>
    //                 </div>
    //                 <div>
    //                     <Input
    //                         type="number"
    //                         name="secondsPerLevel"
    //                         value={this.state.newGame.secondsPerLevel / 60}
    //                         floatingLabelText="Minutes per blind level"
    //                         onChange={ this.handleNewGameInputChange.bind( this ) }/>
    //                 </div>
    //                 <div>
    //                     <h4>Blinds</h4>
    //                     <ul>
    //                         { this.getBlinds() }
    //                         <li>
    //                             <Input
    //                                 type="number"
    //                                 value={this.state.newSmallBlind}
    //                                 hintText="Small Blind"
    //                                 onChange={ this.handleNewBlindChange.bind( this ) } />
    //                             / { this.state.newSmallBlind * 2 }
    //                             <Button
    //                                 icon={<ContentAdd/>}
    //                                 onClick={ this.addBlind.bind( this ) }/>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </CardText>
    //             <CardActions>
    //                 <Button
    //                     label="Create"
    //                     onClick={ this.createGame.bind( this ) }/>
    //             </CardActions>
    //         </Card>
    //     );
    // }

    render() {
        const game = this.state.game;
        const players = this.state.players;
        if( !game ) {
            return (
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="loading"></div>
                        </div>
                    </div>
                </div>
            );
        }
        const startDt = new Date( parseInt( game.createdTime, 10 ) ).toLocaleString();

        let buttons = '';
        if( authState.user && players ) {
            if( !players[ authState.user.uid ] ) {
                buttons = (
                    <button className="btn btn-primary" onClick={ () => this.joinGame() }>
                        Join Game
                    </button>
                );
            }
        }

        return (
            <div className="container">
                <div className="columns">
                    <div className="column col-12">
                        <div className="navbar navbar--game">
                            <section className="navbar-section">
                                <Link to={ ROUTES.ROOM.getUrl( game.roomId ) } className="btn">
                                    <i className="icon icon-arrow-left"></i>
                                    <span>Back to { game.roomName }</span>
                                </Link>
                            </section>
                            <section className="navbar-center">
                                <h1>{ game.name }</h1>
                                <small>Started: { startDt }</small>
                            </section>
                            <section className="navbar-section">{
                                buttons
                            }</section>
                        </div>
                    </div>
                    <div className="column col-4">
                        <Timer game={game} />
                        <Blinds game={game} />
                    </div>
                    <div className="column col-4">
                        <Pot game={game} players={players}/>
                        <Payouts game={game}/>
                    </div>
                    <div className="column col-4">
                        <Players game={game} players={players} />
                    </div>
                </div>
            </div>
        );
    }
};
