import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';

import ROUTES from '../services/routes';

export default class Room extends React.Component {
    openRoom() {
        console.log( this.props.room );
        browserHistory.push( ROUTES.ROOM.getUrl( { roomName : this.props.room.name } ) );
    }

    render() {
        return (
            <Card onClick={this.openRoom.bind(this)}>
                <CardHeader
                    avatar='http://lorempixel.com/50/50/business'
                    title={this.props.room.name}
                />
            </Card>
        );
    }
}
