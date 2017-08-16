import React from 'react';
import { browserHistory } from 'react-router';

import { getCurrentBlind } from '../../services/timer';
import ROUTES from '../../services/routes';
import { totalPot } from "../../services/payouts";

export default ( props ) => {
    const game = props.game;
    const blind = getCurrentBlind( game );
    const created = new Date( game.createdTime ).toLocaleDateString();
    
    return (
        <div className="tile" onClick={ () => browserHistory.push( ROUTES.GAME.getUrl( game ) ) }>
            <div className="tile-content">
                <p className="tile-title">
                    { game.name }
                    <small>Started: { created }</small>
                </p>
                <div className="container">
                    <div className="columns text-center">
                        <p className="tile-subtitle column col-4">
                            Players: { game.state.activePlayers }
                        </p>
                        <p className="tile-subtitle column col-4">
                            Pot: ${ totalPot( game ) }
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
