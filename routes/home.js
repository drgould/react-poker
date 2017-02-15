'use strict';

import React from 'react';
import RoomComponent from '../components/Room';
import db from '../services/db';
import { smallBlinds } from '../services/variables';
import _clone from 'lodash/clone';

class Home extends React.Component {
    constructor() {
        this.state = { rooms : [] };
        this.tempRoom = {
            name : 'New Room',
            blinds : _clone( smallBlinds )
        };
    }
    componentDidMount() {
        this.roomsRef = db.syncState( `rooms`, {
            context : this,
            state : 'rooms',
            asArray : true
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomsRef );
    }

    saveRoom( ev ) {
        ev.preventDefault();
        this.setState( {
            rooms : this.state.rooms.concat( _clone( this.tempRoom ) )
        } );
    }

    updateName( ev ) {
        this.tempRoom.name = ev.target.value;
    }

    getRooms() {
        if( !this.state.rooms.length ) {
            return <h3>No Rooms!</h3>;
        }
        return this.state.rooms.map( room => <RoomComponent key={room.key} room={room}/> );
    }

    render() {
        return (
        <div>
            <h1>Rooms</h1>
            <div>{ this.getRooms() }</div>
            <form onSubmit={ev => this.saveRoom( ev )}>
                <h2>Create a Room</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        onChange={this.updateName.bind( this )} />
                </label>
                <button type="submit">Create Room</button>
            </form>
        </div> );
    }
}

export default Home;
