import React from 'react';

import GameCard from '../GameCard';
import db from '../../services/db';

export default ( props ) => {
    const games = Object.values( props.games );
    const getGames = ( inProgress ) => {
        if( games.length ) {
            const gamesToShow = games.filter( game => game.finished !== inProgress );
            if ( gamesToShow.length ) {
                return (
                    <div className="panel-body">{
                        gamesToShow.map( game => <GameCard game={ game } key={ game.key }/> )
                    }</div>
                );
            }
        }
        return (
            <div className="empty">
                <h4 className="empty-title">
                    No Games
                </h4>
                <p className="empty-subtitle">
                    { inProgress ? 'You know you want to start one!' : 'Hurry up and play already!' }
                </p>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="columns">
                <div className="column col-6">
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title text-center">
                                Active Games
                            </div>
                        </div>
                        { getGames( true ) }
                    </div>
                </div>
                <div className="column col-6">
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title text-center">
                                Completed Games
                            </div>
                        </div>
                        { getGames( false ) }
                    </div>
                </div>
            </div>
        </div>
    );
}
