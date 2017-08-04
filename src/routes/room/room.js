import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _cloneDeep from 'lodash/cloneDeep';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import Button from 'react-toolbox/lib/button';

import Container from '../../components/Container';
import Game from '../../components/GameCard';
import RoomForm from '../../components/RoomForm';
import db from '../../services/db';
import ROUTES from '../../services/routes';
import { defaultGame, defaultRoom } from '../../services/variables';

class Room extends React.Component {
    constructor() {
        console.log( 'hmm' );
        super();
        this.state = {
            roomId : undefined,
            room : _cloneDeep( defaultRoom ),
            games : [],
        };
    }
    componentDidMount() {
        const roomName = this.props.params.roomName;
        if( roomName ) {
            this.initRoom( roomName );
            this.setState( { roomId : roomName } );
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

    createGame() {
        const newGame = _cloneDeep( defaultGame );
        newGame.roomId = this.state.room.key;
        db.push( 'games', { data : newGame } )
            .then( ( { key } ) => { browserHistory.push( ROUTES.GAME.getUrl( { key } ) ); } );
    }

    onSave( room ) {
        this.setState( { roomId : room.key } );
        browserHistory.push( ROUTES.ROOM.getUrl( room ) );
    }

    editRoom() {
        console.log( 'edit room' );
        return (
            <div>
                <h2>{this.state.roomId ? 'Edit Room' : 'Create Room'}</h2>
                <RoomForm
                    room={this.state.room}
                    onSave={ this.onSave.bind( this ) }/>
            </div>
        );
    }

    showRoom() {
        console.log( 'show room' );
        return (
            <div>
                <h2>{ this.state.room.name }</h2>

                <h4>Games</h4>
                <h5>In Progress</h5>
                <ul>{ this.getGames( true ) }</ul>
                <h5>Finished</h5>
                <ul>{ this.getGames( false ) }</ul>
                <Button floating accent icon='add' onClick={ this.createGame.bind( this ) }/>
            </div>
        );
    }

    render() {
        return  (
            <Container>
                { this.state.roomId ? this.showRoom() : this.editRoom() }
            </Container>
        );
    }
}

export default Room;
