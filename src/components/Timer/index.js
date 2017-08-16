import React from 'react';

import { timeRemaining } from '../../services/timer';

export default ( { game } ) => (
    <div className="panel">
        <div className="panel-header">
            <h4 className="panel-title">Time Remaining:</h4>
        </div>
        <div className="panel-body">
            <div className="btn-group btn-group-vertical float-right">
                <button
                    className="btn"
                    onClick={ () => window.dispatchEvent( new Event( game.state.active ? 'pause-clock' : 'start-clock' ) ) }>
                    <i className={ `icon ${ game.state.active ? 'icon-pause' : 'icon-play' }`}></i>
                </button>
                <button
                    className="btn"
                    onClick={ () => window.dispatchEvent( new Event( 'reset-clock' ) ) }>
                    <i className="icon icon-refresh"></i>
                </button>
            </div>
            <h1 className="text-center">{ timeRemaining( game ) }</h1>
        </div>
    </div>
);
