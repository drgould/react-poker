import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';

import Clock from '../Clock';

export default class PageHeader extends React.Component {
    constructor() {
        super();
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
                title="Poker Simulator">
                <Navigation>
                    <Clock/>
                </Navigation>
            </AppBar>
        );
    }
};
