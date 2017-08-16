import React from 'react';

import { getOrdinal } from '../../services/util';
import payouts from '../../services/payouts';

export default ( { game } ) => {
    let currentPayouts = payouts( game );
    if( currentPayouts.length ) {
        currentPayouts = (
            <div className="panel-body">{
                currentPayouts
                    .map( ( payout, index ) => (
                        <div className="tile" key={ index }>
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
                <h4 className="panel-title">Payouts</h4>
            </div>
            { currentPayouts }
        </div>
    );
}
