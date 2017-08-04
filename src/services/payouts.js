export default function payouts( game ) {
    return amounts( totalPot( game.players, game.buyIn ), game.payouts );
}

export function amounts( pot, structure ) {
    for( const { limit, amounts } of structure ) {
        if( pot < limit || limit === -1 ) {
            return amounts.map( portion => pot * portion );
        }
    }
    return []
}

export function totalBuyIns( players ) {
    return players.reduce( ( buyIns, player ) => player.buyIns.length, 0 );
}

export function totalPot( players, buyIn ) {
    return totalBuyIns( players ) * buyIn;
}
