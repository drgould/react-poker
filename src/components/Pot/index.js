import React from 'react';

import { CardText } from 'react-toolbox/lib/card';
import { List, ListItem } from 'react-toolbox/lib/list';

import payouts from '../../services/payouts';
import { totalPot } from '../../services/payouts';
import { getOrdinal } from '../../services/util';

export default ( props ) => (
    <CardText>
        <h1>Pot</h1>
        <h2>${ totalPot( props.game.players, props.game.buyIn ) }</h2>
        <h1>Payouts</h1>
        <List>{
            payouts( props.game )
                .map( ( payout, index ) => (
                    <ListItem
                        key={ index }
                        caption={ `${ getOrdinal( index + 1 ) }: $${ payout }` } />
                ) )
        }</List>
    </CardText>
);
