import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';

import ROUTES from '../../services/routes';
import styles from "./styles.css";

export default ( props ) => (
    <Card
        onClick={ () => browserHistory.push( ROUTES.ROOM.getUrl( props.room ) ) }
        className={ styles.card }>
        <CardMedia aspectRatio="wide" image="http://lorempixel.com/500/500/nature"/>
        <CardTitle title={ props.room.name } />
    </Card>
);
