import React from 'react';
import { Link } from 'react-router';

import Timer from '../../components/Timer';
import Blinds from '../../components/Blinds';
import Players from '../../components/Players';
import db from '../../services/db';
import { authState } from '../../services/auth';
import ROUTES from '../../services/routes';

import './styles.less';
import { defaultGame } from "../../services/variables";

function transformGameInputValue( input ) {
    switch( input.name ) {
        case 'secondsPerLevel':
            return input.value * 60;
        default:
            return input.value;
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            game : undefined,
        };
        window.addEventListener( 'auth-change', () => this.setState( this.state ) );
    }

    componentWillMount() {
        const gameId = this.props.params.gameId;
        db.bindToState(
            `/games/${ gameId }`,
            {
                context : this,
                state : 'game',
            },
        );
        db.bindToState(
            `/players/${ gameId }`,
            {
                context : this,
                state : 'players',
            }
        );
        window.addEventListener( 'raise-blinds', this.handleBlindsUp, false );
    }

    componentWillUnmount() {
        window.removeEventListener( 'blinds-up', this.handleBlindsUp, false );
    }

    handleBlindsUp() {
        let body = document.getElementsByTagName( 'body' )[0];
        body.classList.add( 'flashing' );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 1700 );
        setTimeout( function() { body.classList.add( 'flashing' ); }, 1800 );
        setTimeout( function() { body.classList.remove( 'flashing' ); }, 3500 );
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
        db.post( `/players/${ this.state.game.key }/${ authState.user.uid }`, defaultGame )
            .then();
    }

    buyIn( cash ) {
        const buyIns = this.state.players[ authState.user.uid ].buyIns || { cash : 0, venmo : 0 };
        db.update( `/players/${ this.props.game.key }/${ authState.user.uid }`, { buyIns } );
    }

    gameEditor() {
        return (
            <Card>
                <CardTitle title="Create a Game"/>
                <CardText>
                    <div>
                        $<Input
                        type="number"
                        name="buyIn"
                        value={this.state.newGame.buyIn}
                        floatingLabelText="Buy In Amount"
                        onChange={ this.handleNewGameInputChange.bind( this ) }/>
                    </div>
                    <div>
                        <Input
                            type="number"
                            name="secondsPerLevel"
                            value={this.state.newGame.secondsPerLevel / 60}
                            floatingLabelText="Minutes per blind level"
                            onChange={ this.handleNewGameInputChange.bind( this ) }/>
                    </div>
                    <div>
                        <h4>Blinds</h4>
                        <ul>
                            { this.getBlinds() }
                            <li>
                                <Input
                                    type="number"
                                    value={this.state.newSmallBlind}
                                    hintText="Small Blind"
                                    onChange={ this.handleNewBlindChange.bind( this ) } />
                                / { this.state.newSmallBlind * 2 }
                                <Button
                                    icon={<ContentAdd/>}
                                    onClick={ this.addBlind.bind( this ) }/>
                            </li>
                        </ul>
                    </div>
                </CardText>
                <CardActions>
                    <Button
                        label="Create"
                        onClick={ this.createGame.bind( this ) }/>
                </CardActions>
            </Card>
        );
    }

    render() {
        const game = this.state.game;
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
        if( authState.user && this.state.players ) {
            if( this.state.players[ authState.user.uid ] ) {
                buttons = (
                    <button className="btn btn-primary" onClick={ () => this.buyIn( true ) }>
                        Buy In (Cash)
                    </button>
                ) + (
                    <button className="btn btn-primary" onClick={ () => this.buyIn( false ) }>
                        Buy In (Venmo)
                    </button>
                );
            } else {
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
                        <div className="navbar">
                            <section className="navbar-section">
                                <Link to={ ROUTES.ROOM.getUrl( game.roomUrl ) } className="btn btn-link">
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
                        <Blinds game={this.state.game} />
                    </div>
                    <div className="column col-4">
                        <Timer game={this.state.game} />
                    </div>
                    <div className="column col-4">
                        <Players game={this.state.game} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
