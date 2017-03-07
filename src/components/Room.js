import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import {
    Card,
    CardTitle
} from 'react-toolbox/lib/card';

import ROUTES from '../services/routes';

export default class Room extends React.Component {
    openRoom() {
        browserHistory.push( ROUTES.ROOM.getUrl( { roomName : this.props.room.name } ) );
    }

    render() {
        return (
            <Card onClick={this.openRoom.bind(this)}>
                <CardTitle
                    avatar='http://lorempixel.com/50/50/business'
                    title={this.props.room.name}
                />
            </Card>
        );
    }
}
