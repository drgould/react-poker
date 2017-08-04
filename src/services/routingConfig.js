import ROUTES from './routes';
import Home from '../routes/home';
import Room from '../routes/room';
import Game from '../routes/game';
import AppFrame from '../components/AppFrame';

export default {
    path : ROUTES.HOME.path,
    component : AppFrame,
    indexRoute : { component : Home },
    childRoutes : [
        {
            path : ROUTES.ROOM.path,
            component : Room,
        },
        {
            path : ROUTES.GAME.path,
            component : Game,
        },
    ],
};
