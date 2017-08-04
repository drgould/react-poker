import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';

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
            <AppBar title={ <Link to="/">Hold-em Helper</Link> }>
                <Navigation>
                    <Clock/>
                </Navigation>
            </AppBar>
        );
    }
};
