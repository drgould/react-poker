'use strict';

import React from 'react';
import { Link } from 'react-router';

class Room extends React.Component {
    render() {
        return (
            <Link to={`/room/${this.props.room.key}`}>{this.props.room.name}</Link>
        );
    }
}

export default Room;
