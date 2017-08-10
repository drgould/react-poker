import React from 'react';

export default class Clock extends React.Component {
    constructor() {
        super();
        this.state = ( { now: new Date() } );

        setInterval( this.updateClock.bind( this ), 1000 );
    }

    updateClock() {
        this.setState( { now: new Date() } );
    }

    getTime() {
        return this.state.now.toLocaleTimeString( undefined, { hour : 'numeric', minute : 'numeric', second : undefined } );
    }

    render() {
        return <label className="chip">{this.getTime()}</label>;
    }
};
