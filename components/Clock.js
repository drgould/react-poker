import React from 'react';
import Chip from 'material-ui/Chip';

export default class Clock extends React.Component {
    constructor() {
        this.state = ( { now: new Date() } );

        this.updateClock = this.updateClock.bind( this );
        setInterval( this.updateClock, 1000 );
    }

    updateClock() {
        this.setState( { now: new Date() } );
    }

    getTime() {
        return this.state.now.toLocaleTimeString( undefined, { hour : 'numeric', minute : 'numeric', second : undefined } );
    }

    render() {
        return <Chip>{this.getTime()}</Chip>;
    }
};
