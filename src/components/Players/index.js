import React from 'react';
import _map from 'lodash/map';

import Player from '../Player';

export default ( { game : { options : { buyIn } }, players } ) => {
    let playerList = (
        <div className="empty">
            <h4 className="empty-title">No Players</h4>
            <p className="empty-subtitle">Click the button above to join.</p>
        </div>
    );
    if( !players ) {
        playerList = (
            <div className="panel-body">
                <div className="loading centered"></div>
            </div>
        );
    } else if( Object.keys( players ).length ) {
        playerList = (
            <div className="panel-body">{
                _map( players, ( player, key ) => <Player key={ key } player={ Object.assign( { key }, player ) } buyIn={ buyIn } /> )
            }</div>
        );
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h4 className="panel-title">Players</h4>
            </div>
            { playerList }
        </div>
    );
};
