import React from 'react';

import Player from '../Player';

export default ( props ) => {
    let list;
    if( props.game.players.length ) {
        list = (
            <List>{
                props.game.players.map( player => <Player key={ player.uid } player={ player } />)
            }</List>
        )
    } else {
        list = <h2>No Players</h2>;
    }

    return (
        <CardText>
            <h1>Players</h1>
            { list }
        </CardText>
    );
}
