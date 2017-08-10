import React from 'react';

import { timeRemaining } from '../../services/timer';

export default ( props ) => (
    <div className="panel">
        <div className="panel-header">
            <h4 className="panel-title">Time Remaining:</h4>
        </div>
        <div className="panel-body">
            <h1>{ timeRemaining( props.game ) }</h1>
        </div>
        <div className="panel-footer text-center">
            <div className="btn-group">
                <button
                    className="btn btn-primary"
                    onClick={ () => window.dispatchEvent( new Event( props.game.active ? 'pause-clock' : 'start-clock' ) ) }>
                    { props.game.active ? 'Pause' : 'Play' }
                </button>
                <button
                    className="btn"
                    onClick={ () => window.dispatchEvent( new Event( 'reset-clock' ) ) }>
                    Reset
                </button>
            </div>
        </div>
    </div>
);
