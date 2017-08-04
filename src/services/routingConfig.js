import ROUTES from './routes';
import Home from '../routes/home/index';
import Room from '../routes/room/room';
import Game from '../routes/game/game';
import AppFrame from '../components/AppFrame/index';

export default {
    path : ROUTES.HOME.path,
    component : AppFrame,
    indexRoute : { component : Home },
    onEnter() {
        //appState.pageTitle = 'Poker Simulator';
    },
    onLeave() {
        console.log( 'wtf' );
    },
    childRoutes : [
        {
            path : ROUTES.ROOM.path,
            component : Room,
            onEnter( { params } ) {
                console.log( params );
                //appState.pageTitle = `${params.roomName} - Poker Simulator`;
            },
        },
        {
            path : ROUTES.GAME.path,
            component : Game,
            onEnter( { params } ) {
                //appState.pageTitle = `Game - Poker Simulator`;
            },
        },
    ],
};
