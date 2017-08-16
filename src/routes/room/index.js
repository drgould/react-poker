import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import _cloneDeep from 'lodash/cloneDeep';

import GameList from '../../components/GameList';
import RoomForm from '../../components/RoomForm';
import db from '../../services/db';
import ROUTES from '../../services/routes';
import { defaultGame } from '../../services/variables';
import { getCurrentTime } from "../../services/timer";
import { authState } from "../../services/auth";

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            room : undefined,
            games : [],
            editing : false,
        };

        this._forceUpdate = () => this.forceUpdate();
    }
    componentWillMount() {
        window.addEventListener( 'auth-state-change', this._forceUpdate, false );
    }

    componentDidMount() {
        this.initRoom( this.props.params.roomName );
    }

    componentWillUnmount() {
        window.removeEventListener( 'auth-state-change', this._forceUpdate, false );
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
            } );
        }
    }

    createGame() {
        const room = this.state.room;
        const createdTime = getCurrentTime();
        const newGame = Object.assign( _cloneDeep( defaultGame ), {
            roomId : room.key,
            roomName : room.name,
            name : `${ room.name } Game`,
            createdTime,
        } );
        const path = `${ room.key }/${ createdTime }`;
        db.post( `/games/${ path }`, { data : newGame } )
            .then( () => db.post( `/players/${ path }` ) )
            .then( () => { browserHistory.push( ROUTES.GAME.getUrl( newGame ) ); } );
    }

    onSave( room ) {
        browserHistory.push( ROUTES.ROOM.getUrl( room ) );
        this.initRoom( room.key );
    }

    render() {
        const room = this.state.room;
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
                        !room || this.state.editing || !authState.user ?
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
