import React from 'react';
import _cloneDeep from 'lodash/cloneDeep';

import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Input } from 'react-toolbox/lib/input';

import { defaultGame } from '../../services/variables';
import Timer from '../../components/Timer';
import Blinds from '../../components/Blinds';
import Container from '../../components/Container';
import Pot from '../../components/Pot';
import Debts from '../../components/Debts';
import db from '../../services/db';

import { secondsPerBlind, payouts, buyIn, smallBlinds } from '../../services/variables.js';

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
            game : _cloneDeep( defaultGame ),
        }
    }

    componentWillMount() {
        this.gameRef = db.bindToState(
            `/game/${this.props.params.gameId}`,
            {
                context : this,
                state : 'game',
            },
        );
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

    createGame( ev ) {
        ev.preventDefault();
        this.setState( {
            games : this.state.games.concat( _clone( this.state.newGame ) ),
            newGame : _clone( defaultGame )
        } );
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
        return (
            <Container>
                <Blinds smallBlinds={ smallBlinds } />
                <Timer startingTime={ secondsPerBlind } />
                <div className="col3">
                    <Pot payouts={ payouts } buyIn={ buyIn } />
                    <Debts />
                </div>
            </Container>
        );
    }
}

export default Game;
