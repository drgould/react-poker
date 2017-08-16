

const ROUTES = {
    HOME : {
        path : '/',
        getUrl() {
            return this.path;
        },
    },
    ROOM : {
        path : 'r/(:roomName)',
        getUrl( room ) {
            return `/${this.path.replace( '(:roomName)', typeof room === 'string' ? room : room.key )}`;
        },
    },
    GAME : {
        path : 'g/(:gameId)',
        getUrl( { roomId = '', createdTime = '' } = {} ) {
            return `/${this.path.replace( '(:gameId)',  `${ roomId }_${ createdTime }` )}`;
        },
    },
};

export default ROUTES;
