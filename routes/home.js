'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import RoomComponent from '../components/Room';
import Button from 'react-md/lib/Buttons/Button'
import db from '../services/db';
import { smallBlinds, defaultRoom } from '../services/variables';
import _clone from 'lodash/clone';
import _cloneDeep from 'lodash/cloneDeep';

class Home extends React.Component {
    constructor() {
        this.state = { rooms : [] };
        this.tempRoom = {
            name : 'New Room',
            blinds : _clone( smallBlinds )
        };
    }
    componentDidMount() {
        this.roomsRef = db.bindToState( `rooms`, {
            context : this,
            state : 'rooms',
            asArray : true
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomsRef );
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
                <Button
                    floating
                    secondary
                    fixed
                    onClick={() => browserHistory.push( '/rooms/new' )}
                    tooltipLabel="Create Room"
                    tooltipPosition="left">
                    add
                </Button>
            </div>
        );
    }
}

export default Home;
