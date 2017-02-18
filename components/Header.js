import React from 'react';
import { withRouter } from 'react-router';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';

import Clock from './Clock';

export default withRouter( class Header extends React.Component {
    constructor() {
        this.state = ( { now: new Date() } );

        this.updateClock = this.updateClock.bind( this );
        setInterval( this.updateClock, 1000 );
    }

    updateClock() {
        this.setState( { now: new Date() } );
    }

    render() {
        return <Toolbar fixed colored title="Poker Simulator" actions={<Clock/>} />;
    }
} );
