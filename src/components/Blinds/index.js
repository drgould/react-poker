import React from 'react';

import styles from './styles.css';

import { getCurrentBlind } from '../../services/timer';

export default ( props ) => {
    const blinds = props.game.blinds;
    const currentBlind = getCurrentBlind( props.game );
    console.log( currentBlind );
    return (
        <Card>
            <CardTitle title="Blinds"/>
            <List>{
                blinds.map( blind => (
                    <ListItem
                        key={ blind }
                        caption={ `${ blind } / ${ blind * 2 }` }
                        { ...( blind === currentBlind ? { className : styles.active } : {} ) } />
                ) )
            }</List>
            <CardActions>
                <Button onClick={ () => window.dispatchEvent( new Event( 'raise-blinds' ) ) } label="Raise" />
                <Button onClick={ () => window.dispatchEvent( new Event( 'lower-blinds' ) ) } label="Lower"/>
            </CardActions>
        </Card>
    );
}
