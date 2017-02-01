'use strict';

import { Component } from 'react';
import db from '../services/db';
import Room from './Room';

class Rooms extends Component {
    componentWillMount() {
        this.roomsRef = db.bindToState( `rooms/${this.props.params.roomId}`, {
            context : this,
            state : 'rooms',
            asArray : true
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomsRef );
    }
    render() {
        return (
            <div>
                <h1>Rooms</h1>
                <div>{ this.state.rooms.map( room => <Room room={room}/> ) }</div>
            </div>
        );
    }
}

export default Rooms;