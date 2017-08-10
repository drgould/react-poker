import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';

import { totalPot } from '../../services/payouts';
import { getCurrentBlind } from '../../services/timer';
import ROUTES from '../../services/routes';

export default ( props ) => {
    const players = props.game.players || [];
    const activePlayers = players.filter( player => player.active ).length;
    console.log( 'here?' );
    const pot = totalPot( players, props.game.buyIn );
    console.log( 'nah' );
    const blind = getCurrentBlind( props.game );
    const created = new Date( props.game.createdTime ).toLocaleDateString();
    return (
        <div className="tile" onClick={ () => browserHistory.push( ROUTES.GAME.getUrl( props.game ) ) }>
            <div className="tile-content">
                <p className="tile-title">{ created }</p>
                <div className="container">
                    <div className="columns text-center">
                        <p className="tile-subtitle column col-4">
                            Players: { activePlayers }
                        </p>
                        <p className="tile-subtitle column col-4">
                            Pot: ${ pot }
                        </p>
                        <p className="tile-subtitle column col-4">
                            Blinds: { blind }/{ blind * 2 }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
