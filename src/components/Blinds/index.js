import React from 'react';

import styles from './styles.css';

import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { List, ListItem } from 'react-toolbox/lib/list';

import { blindLevel } from '../../services/timer';

export default ( props ) => {
    const blinds = props.game.blinds;
    const level = blindLevel( props.game );
    return (
        <Card>
            <CardTitle title="Blinds"/>
            <List>{
                blinds.map( ( blind, index ) => (
                    <ListItem
                        key={index}
                        caption={ `${ blind } / ${ blind * 2 }` }
                        className={ level === index ? styles.active : '' } />
                ) )
            }</List>
            <CardActions>
                <Button onClick={ () => window.dispatchEvent( new Event( 'raise-blinds' ) ) } label="Raise" />
                <Button onClick={ () => window.dispatchEvent( new Event( 'lower-blinds' ) ) } label="Lower"/>
            </CardActions>
        </Card>
    );
}
