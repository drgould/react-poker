import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _cloneDeep from 'lodash/cloneDeep';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _pull from 'lodash/pull';
import _last from 'lodash/last';
import Button from 'react-toolbox/lib/button';

import Container from '../../components/Container';
import Game from '../../components/GameCard';
import RoomForm from '../../components/RoomForm';
import db from '../../services/db';
import ROUTES from '../../services/routes';
import { smallBlinds, defaultRoom } from '../../services/variables';

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            roomId : undefined,
            room : _cloneDeep( defaultRoom ),
            games : [],
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
                <Button icon={<ContentDelete />} onClick={ () => this.removeBlind( blind ) }/>
            </li> )
        );
    }

    editRoom() {
        return (
            <div>
                <h2>{this.state.roomId ? 'Edit Room' : 'Create Room'}</h2>
                <RoomForm
                    room={this.state.room}
                    onSave={ ( room ) => browserHistory.push( ROUTES.ROOM.getUrl( { roomName : room.name } ) ) }/>
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

                <h4>Games</h4>
                <h5>In Progress</h5>
                <ul>{ this.getGames( true ) }</ul>
                <h5>Finished</h5>
                <ul>{ this.getGames( false ) }</ul>
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
