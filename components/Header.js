import React from 'react';
import AppBar from 'material-ui/AppBar';

import Clock from './Clock';

export default class Header extends React.Component {
    constructor() {
        this.state = ( { now: new Date() } );

        this.updateClock = this.updateClock.bind( this );
        setInterval( this.updateClock, 1000 );
    }

    updateClock() {
        this.setState( { now: new Date() } );
    }

    render() {
        return (
            <AppBar
                title="Poker Simulator"
                iconElementRight={<Clock/>} />
        );
    }
};
