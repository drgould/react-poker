import Home from '../routes/home';
import Room from '../routes/room';
import RoomEditor from '../routes/room';
import Game from '../routes/game';
import GameEditor from '../routes/game';
import App from '../components/AppFrame';

import appState from './state';

export const routes = {
    path : '/',
    component : App,
    indexRoute : { component : Home },
    onEnter() {
        appState.pageTitle = 'Poker Simulator';
    },
    childRoutes : [
        {
            path : 'new-room',
            component : RoomEditor,
            onEnter() {
                appState.pageTitle = ' Create New Room - Poker Simulator';
            }
        },
        {
            path : 'r/:roomName',
            component : Room,
            onEnter( { params } ) {
                appState.pageTitle = `${params.roomName} - Poker Simulator`;
            }
        },
        {
            path : 'r/:roomName/edit',
            component : RoomEditor,
            onEnter( { params } ) {
                appState.pageTitle = `Edit ${params.roomName} - Poker Simulator`;
            }
        },
        {
            path : 'r/:roomName/start-game',
            component : GameEditor,
            onEnter() {
                appState.pageTitle = `Start a new game - Poker Simulator`;
            }
        },
        {
            path : 'g/:gameId',
            component : Game,
            onEnter( { params } ) {
                appState.pageTitle = `Game - Poker Simulator`;
            }
        }
    ]
};

export function getPath( route, params ) {

}
