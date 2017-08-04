export default {
    blindLevel,
    secondsToTime,
    timeRemaining,
    timeRemainingForBlind,
    totalSecondsPlayed,
};

export function totalSecondsPlayed( startTime, elapsedTime ) {
    const currentTime = Date.now() / 1000;
    return ( currentTime - startTime + elapsedTime );
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
    return Math.floor( interval / totalSecondsPlayed( startTime, elapsedTime ) );
}

export function timeRemaining( game ) {
    return secondsToTime( timeRemainingForBlind( game.interval, game.startTime, game.elapsedTime ) );
}
