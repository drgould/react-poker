import React from 'react';

import timer from '../../services/timer';

export default ( props ) => (
    <Card>
        <CardTitle title="Blinds raise in:" />
        <CardText>
            <h1>{ timer.timeRemaining( props.game ) }</h1>
        </CardText>
        <CardActions>
            <Button onClick={ () => window.dispatchEvent( new Event( 'start-clock' ) ) } label="Play" />
            <Button onClick={ () => window.dispatchEvent( new Event( 'pause-clock' ) ) } label="Pause" />
            <Button onClick={ () => window.dispatchEvent( new Event( 'reset-clock' ) ) } label="Reset" />
        </CardActions>
    </Card>
);
