'use strict';

import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _clone from 'lodash/clone';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _pull from 'lodash/pull';
import _last from 'lodash/last';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';

import Game from '../components/Game';
import db from '../services/db';
import ROUTES from '../services/routes';
import { buyIn, startingSeconds, smallBlinds, payoutLevels } from '../services/variables';

const defaultGame = {
    buyIn,
    secondsPerLevel : startingSeconds,
    blinds : _clone( smallBlinds ),
    payoutLevels : _clone( payoutLevels ),
    inProgress : true,
    blindLevel : 0,
    secondsRemaining : 0,
    players : []
};

function transformGameInputValue( input ) {
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
            roomId : undefined,
            room : { venmo : {} },
            games : [],
            newGame : _clone( defaultGame ),
            newSmallBlind : _last( smallBlinds ) * 2
        };
    }
    componentDidMount() {
        const roomName = this.props.params.roomName;
        if( roomName ) {
            const fetchConfig = {
                context : this,
                asArray : true,
                queries : {
                    orderByChild : 'name',
                    equalTo : roomName
                }
            };
            db.fetch( 'rooms', fetchConfig )
                .then( rooms => {
                    if( rooms.length ) {
                        this.initRoom( rooms[ 0 ].key );
                        this.setState( { roomId : rooms[ 0 ].key } );
                    }
                } );
        }
    }
    componentWillUnmount() {
        if( this.roomRef ) {
            db.removeBinding( this.roomRef );
            db.removeBinding( this.gamesRef );
        }
    }

    initRoom( roomId ) {
        this.roomRef = db.bindToState( `rooms/${roomId}`, {
            context : this,
            state : 'room'
        } );
        this.gamesRef = db.syncState( 'games', {
            context : this,
            state : 'games',
            asArray : true,
            queries : {
                orderByChild : 'roomId',
                equalTo : this.props.params.roomName
            },
        } );
    }

    getGames( inProgress ) {
        const games = _filter( this.state.games, { inProgress } );
        if( games.length ) {
            return _map( games, ( game, index ) => <li key={index}><Game game={game}/></li> );
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
                <RaisedButton icon={<ContentDelete />} onClick={ () => this.removeBlind( blind ) }/>
            </li> )
        );
    }

    handleNewRoomInputChange( ev ) {
        switch( ev.target.name ) {
            case 'name':
                this.state.room.name = ev.target.value;
                break;
            case 'venmo_username':
                this.state.room.venmo.username = ev.target.value;
                break;
            case 'venmo_password':
                this.state.room.venmo.password = ev.target.value;
                break;
        }
        this.setState( { room : this.state.room } );
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

    createRoom( ev ) {
        ev.preventDefault();
        db.push( 'rooms', { data : this.state.room } )
            .then( () => browserHistory.push( ROUTES.ROOM.getUrl( { roomName : this.state.room.name } ) ) );
    }

    createGame( ev ) {
        ev.preventDefault();
        this.setState( {
            games : this.state.games.concat( _clone( this.state.newGame ) ),
            newGame : _clone( defaultGame )
        } );
    }

    editRoom() {
        return (
            <div>
                <h2>{this.state.roomId ? 'Edit Room' : 'Create Room'}</h2>
                <form>
                    <TextField
                        name="name"
                        floatingLabelText="Room Name"
                        value={this.state.room.name}
                        onChange={this.handleNewRoomInputChange.bind( this )}/>

                    <h4>Venmo Escrow Details</h4>
                    <TextField
                        name="venmo_username"
                        floatingLabelText="Email or Phone Number"
                        value={this.state.room.venmo.username}
                        onChange={this.handleNewRoomInputChange.bind( this )}/>
                    <TextField
                        type="password"
                        name="venmo_password"
                        floatingLabelText="Password"
                        value={this.state.room.venmo.password}
                        onChange={this.handleNewRoomInputChange.bind( this )}/>

                    <RaisedButton
                        label={this.state.roomId ? 'Save' : 'Create'}
                        onClick={this.createRoom.bind( this )}/>
                </form>
            </div>
        );
    }

    showRoom() {
        return (
            <div>
                <h2>{ this.state.room.name }</h2>

                <h3>Venmo Account</h3>
                <ul>

                </ul>

                <Card>
                    <CardTitle title="Create a Game"/>
                    <CardText>
                        <div>
                            $<TextField
                                type="number"
                                name="buyIn"
                                value={this.state.newGame.buyIn}
                                floatingLabelText="Buy In Amount"
                                onChange={ this.handleNewGameInputChange.bind( this ) }/>
                        </div>
                        <div>
                            <TextField
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
                                    <TextField
                                        type="number"
                                        value={this.state.newSmallBlind}
                                        hintText="Small Blind"
                                        onChange={ this.handleNewBlindChange.bind( this ) } />
                                    / { this.state.newSmallBlind * 2 }
                                    <RaisedButton
                                        icon={<ContentAdd/>}
                                        onClick={ this.addBlind.bind( this ) }/>
                                </li>
                            </ul>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Create"
                            onClick={ this.createGame.bind( this ) }/>
                    </CardActions>
                </Card>
                <h4>Games</h4>
                <h5>Current</h5>
                <ul>{ this.getGames( true ) }</ul>
                <h5>Finished</h5>
                <ul>{ this.getGames( false ) }</ul>
            </div>
        );
    }

    render() {
        if( this.state.roomId ) {
            return this.showRoom();
        }
        return this.editRoom();
    }
}

export default Room;
