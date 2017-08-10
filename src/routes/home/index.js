import React from 'react';
import { Link, browserHistory } from 'react-router';

import db from '../../services/db';
import ROUTES from '../../services/routes';
import RoomCard from '../../components/RoomCard';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms : undefined,
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
        if( !this.state.rooms ) {
            return <div className="loading centered"></div>;
        }
        if( !this.state.rooms.length ) {
            return (
                <div className="empty">
                    <h4 className="empty-title">
                        No Rooms!
                    </h4>
                    <p className="empty-subtitle">
                        Click the button to create a new room.
                    </p>
                    <div className="empty-action">
                        <Link to={ ROUTES.ROOM.getUrl() } className="btn btn-primary">
                            Create a Room
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="columns">{
                    this.state.rooms.map( room => <RoomCard key={room.key} room={room}/> )
                }</div>
            </div>
        );
    }

    render() {
        return (
            <div className="column">
                <div className="navbar">
                    <section className="navbar-section"></section>
                    <section className="navbar-center">
                        <h1 className="text-center">Rooms</h1>
                    </section>
                    <section className="navbar-section">
                        <button className="btn btn-primary" onClick={ () => { browserHistory.push( ROUTES.ROOM.getUrl() ) } }>
                            <i className="icon icon-plus"></i>
                            <span>Create Room</span>
                        </button>
                    </section>
                </div>
                <div className="divider"></div>
                { this.getRooms() }
            </div>
        );
    }
}

export default Home;
