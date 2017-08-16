import React from 'react';

import { totalPot } from '../../services/payouts';
import { authState } from '../../services/auth';

export default ( { game, players } ) => {
    let potButtons = '';
    if( players && authState.user && players[ authState.user.uid ] ) {
        potButtons = (
            <div className="btn-group btn-group-vertical float-right">
                <button className="btn" onClick={ () => window.dispatchEvent( new Event( 'cash-buy-in' ) ) }>
                    Buy In (Cash)
                </button>
                <button className="btn" onClick={ () => window.dispatchEvent( new Event( 'venmo-buy-in' ) ) }>
                    Buy In (Venmo)
                </button>
            </div>
        );
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h4 className="panel-title">Pot</h4>
            </div>
            <div className="panel-body">
                { potButtons }
                <h1 className="text-center">${ totalPot( game ) }</h1>
            </div>
        </div>
    );
}
