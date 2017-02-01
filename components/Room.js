'use strict';

import { Component } from 'react';
import { Link } from 'react-router';

class Room extends Component {
    render() {
        return (
            <Link to={`/room/${this.props.room.id}`}>{this.props.room.name}</Link>
        );
    }
}

export default Room;