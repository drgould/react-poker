import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _cloneDeep from 'lodash/cloneDeep';
import Button from 'react-toolbox/lib/button';

import Container from '../../components/Container';
import GameList from '../../components/GameList';
import RoomForm from '../../components/RoomForm';
import db from '../../services/db';
import ROUTES from '../../services/routes';
import { defaultGame } from '../../services/variables';

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms : [],
        };
    }
    componentDidMount() {
        this.initRoom( this.props.params.roomName );
    }

    initRoom( roomId ) {
        if( roomId ) {
            db.bindToState( `rooms`, {
                context : this,
                state : 'rooms',
                asArray : true,
                queries : {
                    orderByChild : 'url',
                    equalTo : roomId,
                },
            } );
        }
    }

    createGame( room ) {
        const newGame = _cloneDeep( defaultGame );
        newGame.roomId = room.key;
        db.push( 'games', { data : newGame } )
            .then( ( { key } ) => { browserHistory.push( ROUTES.GAME.getUrl( { key } ) ); } );
    }

    onSave( room ) {
        browserHistory.push( ROUTES.ROOM.getUrl( room ) );
        this.initRoom( room.url );
    }

    editRoom( room ) {
        return (
            <div>
                <h1>Create Room</h1>
                <RoomForm
                    room={ room }
                    onSave={ this.onSave.bind( this ) }/>
            </div>
        );
    }

    showRoom( room ) {
        return (
            <div>
                <h1>{ room.name }</h1>
                <GameList room={ room } />
                <Button floating accent icon='add' onClick={ () => this.createGame( room ) }/>
            </div>
        );
    }

    render() {
        const room = this.state.rooms[ 0 ];
        return  (
            <Container>
                { room ? this.showRoom( room ) : this.editRoom( room ) }
            </Container>
        );
    }
}

export default Room;
