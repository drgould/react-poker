export const buyIn = 20;
export const secondsPerLevel = 15 * 60;
export const smallBlinds = [ 100, 200, 300, 400, 500, 800, 1000, 1500, 2000, 3000, 5000 ];
export const payoutLevels = [
    {
        limit : 100,
        amounts : [ 1 ],
    },
    {
        limit : -1,
        amounts : [ 0.5, 0.3, 0.2 ],
    },
];

export const defaultRoom = {
    name : '',
    url : '',
    defaultBlinds : smallBlinds,
    defaultBuyIn : buyIn,
    defaultInterval : secondsPerLevel,
    defaultPayout : payoutLevels,
};

export const defaultGame = {
    name : '',
    roomId : '',
    createdTime : 0,
    options : {
        buyIn,
        interval : secondsPerLevel,
        blinds : smallBlinds,
        payouts : payoutLevels,
    },
    state : {
        active : false,
        finished : false,
        startTime : 0,
        elapsedTime : 0,
        activePlayers : 0,
        inactivePlayers : 0,
        cashBuyIns : 0,
        venmoBuyIns : 0,
    }
};

export const defaultPlayer = {
    buyIns : {
        cash : 0,
        venmo : 0,
    },
    active : true,
};
