import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _cloneDeep from 'lodash/cloneDeep';

import GameList from '../../components/GameList';
import RoomForm from '../../components/RoomForm';
import db from '../../services/db';
import ROUTES from '../../services/routes';
import { defaultGame } from '../../services/variables';

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            room : undefined,
            games : [],
            editing : false,
        };
    }
    componentDidMount() {
        this.initRoom( this.props.params.roomName );
    }

    initRoom( roomId ) {
        if( roomId ) {
            db.bindToState( `/rooms/${ roomId }`, {
                context : this,
                state : 'room'
            } );
            db.bindToState( `/games/${ roomId }`, {
                context : this,
                state : 'games',
                asArray : true,
            } );
        }
    }

    createGame() {
        const room = this.state.rooms[ 0 ];
        const newGame = Object.assign( _cloneDeep( defaultGame ), {
            roomId : room.key,
            roomUrl : room.url,
            roomName : room.name,
            name : `${ room.name } Game`,
            createdTime : Date.now(),
        } );
        db.push( `/games/${ room.url }`, { data : newGame } )
            .then( ( { key } ) => { browserHistory.push( ROUTES.GAME.getUrl( { key } ) ); } );
    }

    onSave( room ) {
        browserHistory.push( ROUTES.ROOM.getUrl( room ) );
        this.initRoom( room.url );
    }

    render() {
        const room = this.state.rooms[ 0 ];
        let roomName = <div className="loading centered"></div>;
        let gamesList = <div className="loading centered"></div>
        if( room && !this.state.editing ) {
            roomName = room.name;
            gamesList = <GameList games={ this.state.games } />;
        } else if( ( room && this.state.editing ) || !this.props.params.roomName ) {
            roomName = room ? 'Edit Room' : 'Create a Room';
            gamesList = <RoomForm room={ room } onSave={ this.onSave.bind( this ) }/>;
        }
        return(
            <div className="column">
                <div className="navbar">
                    <section className="navbar-section"></section>
                    <section className="navbar-center">
                        <h2>{ roomName }</h2>
                    </section>
                    <section className="navbar-section">{
                        !room || this.state.editing ?
                            '' :
                            <button className="btn btn-primary" onClick={this.createGame.bind( this )}>
                                <span>Create Game</span>
                                <i className="icon icon-plus"></i>
                            </button>
                    }</section>
                </div>
                <div className="divider"></div>
                { gamesList }
            </div>
        );
    }
}

export default Room;
