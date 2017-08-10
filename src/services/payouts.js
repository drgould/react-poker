export default function payouts( game ) {
    return amounts( totalPot( game ), game.options.payouts );
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

export function totalPot( { options : { buyIn }, state : { cashBuyIns, venmoBuyIns }} ) {
    return ( cashBuyIns + venmoBuyIns ) * buyIn;
}
