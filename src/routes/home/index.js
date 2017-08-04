import React from 'react';
import { Link } from 'react-router';
import Button from 'react-toolbox/lib/button';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import db from '../../services/db';
import Container from '../../components/Container';
import RoomCard from '../../components/RoomCard';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms : [],
            loading : true
        };
    }
    componentDidMount() {
        db.bindToState( `rooms`, {
            context : this,
            state : 'rooms',
            asArray : true,
            then() {
                this.setState( { loading : false } );
            }
        } );
    }

    getRooms() {
        if( this.state.loading ) {
            return (
                <ProgressBar
                    type="circular"
                    mode="indeterminate"/>
            );
        }
        if( !this.state.rooms.length ) {
            return <h3>No Rooms!</h3>;
        }
        return this.state.rooms.map( room => <RoomCard key={room.key} room={room}/> );
    }

    render() {
        return (
            <Container>
                <h1>Rooms</h1>
                <hr/>
                <div>{ this.getRooms() }</div>
                <Link to="/r/">
                    <Button floating accent icon='add'/>
                </Link>
            </Container>
        );
    }
}

export default Home;
