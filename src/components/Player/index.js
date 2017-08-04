import React from 'react';

import { ListItem } from 'react-toolbox/lib/list';

function buyInString( player, buyIn ) {
    const totalBuyIn = player.buyIns.length * buyIn;
    const cashBuyIn = player.buyIns.filter( buy => buy.cash ).length * buyIn;
    const venmoBuyIn = player.buyIns.filter( buy => !buy.cash ).length * buyIn;
    return `Total: $${ totalBuyIn } Cash: $${ cashBuyIn } Venmo: $${ venmoBuyIn }`;
}

export default ( props ) => (
    <ListItem
        avatar="http://lorempixel.com/50/50/business"
        caption={ props.player.displayName }
        legend={ buyInString( props.player, props.buyIn ) } />
);
