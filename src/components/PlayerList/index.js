import React from 'react';

import Player from '../Player';

export default ( { players = {} } ) => {
    console.log( players );
    if( Object.keys( players ).length ) {
        return (
            <div className="panel-body">{
                players.map( player => <Player key={ player.key } player={ player } /> )
            }</div>
        );
    }
    return (
        <div className="empty">
            <h4 className="empty-title">No Players</h4>
            <p className="empty-subtitle">Click the button above to join.</p>
        </div>
    );
}
