export default {
    timeRemainingForBlinds,
    blindLevel,
    totalSecondsPlayed,
    startTimer,
};

export function totalSecondsPlayed( game ) {
    const currentTime = Date.now() / 1000;
    return ( currentTime - game.startTime + game.elapsedTime );
}

export function timeRemainingForBlinds( game ) {
    return game.interval - ( game.interval % totalSecondsPlayed( game ) );
}

export function blindLevel( game ) {
    return Math.floor( game.interval / totalSecondsPlayed( game ) );
}

export function startTimer() {

}
