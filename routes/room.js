'use strict';

import React from 'react';
import GameComponent from '../components/Game';
import db from '../services/db';

class Room extends React.Component {
    constructor() {
        this.state = {
            room : {},
            games : []
        };
    }
    componentDidMount() {
        this.roomRef = db.bindToState( `rooms/${this.props.params.roomId}`, {
            context : this,
            state : 'room'
        } );
        this.gamesRef = db.bindToState( 'games', {
            context : this,
            state : 'games',
            asArray : true,
            queries : {
                equalTo : [ 'roomId', this.props.params.roomId ]
            }
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomRef );
        db.removeBinding( this.gamesRef );
    }
    getGames( inProgress ) {
        return this.state.games.filter( game => game.inProgress === inProgress ).map( game => <li><GameComponent key={game.key} game={game}/></li> );
    }

    getBlinds() {
        this.state.room.blinds.map( blind => <li>{ blind } / { blind * 2 }</li> )
    }
    render() {
        let inactiveGames = this.state.games;
        return (
            <div>
                <h2>{ this.state.room.name }</h2>
                <h3>Default Options</h3>
                <h4>Minutes per level</h4>
                <p>{ this.state.room.minutesPerLevel }</p>
                <h4>Blinds</h4>
                <ul>{  }</ul>
                <h4>Games</h4>
                <h5>In Progress</h5>
                <ul>{ this.getGames( true ) }</ul>
                <h5>Finished</h5>
                <ul>{ this.state.games.filter( game => !game.inProgress ).map( game => ( <li><GameComponent game={game}/></li> ) ) }</ul>
            </div>
        );
    }
}

export default Room;
