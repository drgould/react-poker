import React from 'react';

import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import Pot from '../Pot';
import PlayerList from '../PlayerList';

export default ( props ) => (
    <Card>
        <CardTitle title="Players" />
        <Pot game={ props.game } />
        <PlayerList game={ props.game } />
        <CardActions>
            <Button label="Buy In (Cash)" onClick={ () => window.dispatchEvent( new Event( 'buy-in', { cash: true } ) ) } />
            <Button label="Buy In (Venmo)" onClick={ () => window.dispatchEvent( new Event( 'buy-in', { cash: false } ) ) } />
        </CardActions>
    </Card>
);
