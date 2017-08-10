export function totalSecondsPlayed( startTime, elapsedTime ) {
    if( startTime ) {
        const currentTime = Math.round( Date.now() / 1000 );
        return ( currentTime - startTime + elapsedTime );
    }
    return 0;
}

export function timeRemainingForBlind( interval, startTime, elapsedTime ) {
    if( !startTime ) {
        return interval;
    }
    return interval - ( interval % totalSecondsPlayed( startTime, elapsedTime ) );
}

export function secondsToTime( seconds ) {
    return new Date( 1000 * seconds ).toISOString().substr(14, 5);
}

export function blindLevel( interval, startTime, elapsedTime ) {
    const secondsPlayed = totalSecondsPlayed( startTime, elapsedTime );
    return secondsPlayed ? Math.floor( interval / secondsPlayed ) : 0;
}

export function getCurrentBlind( game ) {
    return game.blinds[ blindLevel( game.options.interval, game.state.startTime, game.state.elapsedTime ) ];
}

export function timeRemaining( game ) {
    return secondsToTime( timeRemainingForBlind( game.options.interval, game.state.startTime, game.state.elapsedTime ) );
}
