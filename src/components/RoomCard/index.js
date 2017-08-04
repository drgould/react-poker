import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import { Card, CardTitle, CardMedia } from 'react-toolbox/lib/card';

import ROUTES from '../../services/routes';
import styles from "./styles.css";

export default ( props ) => (
    <Card
        onClick={ () => browserHistory.push( ROUTES.ROOM.getUrl( props.room ) ) }
        className={ styles.card }>
        <CardTitle title={ props.room.name } />
        <CardMedia aspectRatio="wide" image="http://lorempixel.com/500/500/nature"/>
    </Card>
);
