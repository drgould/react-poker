import React from 'react';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import _clone from 'lodash/clone';

import db from '../services/db';
import ROUTES from '../services/routes';
import { smallBlinds } from '../services/variables';
import Room from '../components/Room';

class Home extends React.Component {
    constructor() {
        this.state = {
            rooms : [],
            loading : true
        };
        this.tempRoom = {
            name : 'New Room',
            blinds : _clone( smallBlinds )
        };
    }
    componentDidMount() {
        this.roomsRef = db.bindToState( `rooms`, {
            context : this,
            state : 'rooms',
            asArray : true,
            then() {
                this.setState( { loading : false } );
            }
        } );
    }
    componentWillUnmount() {
        db.removeBinding( this.roomsRef );
    }

    getRooms() {
        if( this.state.loading ) {
            return <CircularProgress/>
        }
        if( !this.state.rooms.length ) {
            return <h3>No Rooms!</h3>;
        }
        return this.state.rooms.map( room => <Room key={room.key} room={room}/> );
    }

    render() {
        return (
            <div>
                <h1>Rooms</h1>
                <div>{ this.getRooms() }</div>
                <FloatingActionButton
                    onClick={() => browserHistory.push( ROUTES.ROOM.getUrl() )}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        );
    }
}

export default Home;
