export function totalSecondsPlayed( startTime, elapsedTime, active ) {
    if( !active ) {
        return elapsedTime;
    }
    if( startTime ) {
        return ( getCurrentTime() - startTime + elapsedTime );
    }
    return 0;
}

export function timeRemainingForBlind( interval, startTime, elapsedTime, active ) {
    if( !startTime ) {
        return interval;
    }
    return interval - ( totalSecondsPlayed( startTime, elapsedTime, active ) % interval );
}

export function secondsToTime( seconds ) {
    return new Date( 1000 * seconds ).toISOString().substr(14, 5);
}

export function blindLevel( interval, startTime, elapsedTime, active ) {
    const secondsPlayed = totalSecondsPlayed( startTime, elapsedTime, active );
    return secondsPlayed ? Math.floor( secondsPlayed / interval ) : 0;
}

export function getBlindLevel( game ) {
    return Math.min(
        game.options.blinds.length - 1,
        blindLevel( game.options.interval, game.state.startTime, game.state.elapsedTime, game.state.active )
    );
}

export function getCurrentBlind( game ) {
    return game.options.blinds[ getBlindLevel( game ) ];
}

export function timeRemaining( game ) {
    return secondsToTime( timeRemainingForBlind( game.options.interval, game.state.startTime, game.state.elapsedTime, game.state.active ) );
}

export function getCurrentTime() {
    return Math.round( Date.now().valueOf() / 1000 );
}
