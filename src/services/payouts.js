export default function payouts( game ) {
    return amounts( totalPot( game.players, game.buyIn ), game.payouts );
}

export function amounts( pot=0, structure ) {
    if( !pot ) {
        return [];
    }
    for( const { limit, amounts } of structure ) {
        if( pot < limit || limit === -1 ) {
            return amounts.map( portion => pot * portion );
        }
    }
}

export function totalBuyIns( players=[] ) {
    return players.reduce( ( buyIns, player ) => player.buyIns.length, 0 );
}

export function totalPot( players=[], buyIn=0 ) {
    return totalBuyIns( players ) * buyIn;
}
