'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

class Room extends React.Component {

    openRoom() {
        browserHistory.push( `/rooms/${this.props.room.key}` );
    }

    render() {
        return (
            <Card>
                <CardTitle
                    avatar={<Avatar src="" role="presentation"/>}
                    title={this.props.room.name}
                />
                <CardActions>
                    <Button raised primary label="Open Room" onClick={this.openRoom.bind( this )}/>
                </CardActions>
            </Card>
        );
    }
}

export default Room;
