import React from 'react';

import PlayerList from '../PlayerList';

import { getOrdinal } from '../../services/util';
import payouts, { totalPot } from '../../services/payouts';

export default ( props ) => {
    let currentPayouts = payouts( props.game );
    if( currentPayouts.length ) {
        currentPayouts = (
            <div className="panel-body">{
                currentPayouts
                    .map( ( payout, index ) => (
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar" data-initial={ getOrdinal( index + 1 ) }></figure>
                            </div>
                            <div className="tile-content">
                                <h3>${ payout }</h3>
                            </div>
                        </div>
                    ) )
            }</div>
        );
    } else {
        currentPayouts = (
            <div className="empty">
                <h4 className="empty-title">Empty Pot</h4>
                <p className="empty-subtitle">You can't win if you don't play.</p>
            </div>
        );
    }
    return (
        <div className="panel">
            <div className="panel-header">
                <h4 className="panel-title">Pot</h4>
            </div>
            <div className="panel-body">
                <h1 className="text-center">${ totalPot( props.game.players, props.game.buyIn ) }</h1>
            </div>
            <div className="divider"></div>
            <div className="panel-header">
                <h4 className="panel-title">Payouts</h4>
            </div>
            { currentPayouts }
            <div className="divider"></div>
            <div className="panel-header">
                <h4 className="panel-title">Players</h4>
            </div>
            <PlayerList players={ props.game.players } />
        </div>
    );
};
