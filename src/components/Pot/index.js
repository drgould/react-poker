import React from 'react';

import payouts from '../../services/payouts';
import { totalPot } from '../../services/payouts';
import { getOrdinal } from '../../services/util';

export default ( props ) => (
    <List>
        <ListSubHeader caption="Pot" />
        <ListItem caption={ <h1>${ totalPot( props.game.players, props.game.buyIn ) }</h1> } />
        <ListDivider/>
        <ListSubHeader caption="Payouts" />
        {
            payouts( props.game )
                .map( ( payout, index ) => (
                    <ListItem
                        key={index}
                        caption={`${ getOrdinal( index + 1 ) }: $${ payout }`}/>
                ) )
        }
    </List>
);
