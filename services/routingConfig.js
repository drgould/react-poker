import ROUTES from './routes';
import Home from '../routes/home';
import Room from '../routes/room';
import Game from '../routes/game';
import AppFrame from '../components/AppFrame';

export default {
    ...ROUTES.HOME,
    component : AppFrame,
    indexRoute : { component : Home },
    onEnter() {
        //appState.pageTitle = 'Poker Simulator';
    },
    childRoutes : [
        {
            ...ROUTES.ROOM,
            component : Room,
            onEnter( { params } ) {
                //appState.pageTitle = `${params.roomName} - Poker Simulator`;
            },
        },
        {
            ...ROUTES.GAME,
            component : Game,
            onEnter( { params } ) {
                //appState.pageTitle = `Game - Poker Simulator`;
            },
        },
    ],
};
