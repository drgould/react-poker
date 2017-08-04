import React from 'react';

import GameCard from '../GameCard';
import db from '../../services/db';

export default class Games extends React.Component {
    constructor() {
        super();
        this.state = { games : [] };
    }

    componentDidMount() {
        db.syncState( 'games', {
            context : this,
            state : 'games',
            asArray : true,
            queries : {
                orderByChild : 'roomId',
                equalTo : this.props.room.key
            },
        } );
    }

    getGames( inProgress ) {
        if( this.state.games.length ) {
            const games = this.state.games.filter( game => game.finished !== inProgress );
            if ( games.length ) {
                return <div>{
                    games.map( game => <GameCard game={ game } key={ game.key }/> )
                }</div>;
            }
        }
        return <h4>No Games</h4>;
    }

    render() {
        return (
            <div>
                <h2>Games</h2>
                <h3>In Progress</h3>
                { this.getGames( true ) }
                <h3>Finished</h3>
                { this.getGames( false ) }
            </div>
        );
    }
}
