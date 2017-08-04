

const ROUTES = {
    HOME : {
        path : '/',
        getUrl() {
            return this.path;
        },
    },
    ROOM : {
        path : 'r/(:roomName)',
        getUrl( { url = '' } = {} ) {
            return `/${this.path.replace( '(:roomName)', url )}`;
        },
    },
    GAME : {
        path : 'g/(:gameId)',
        getUrl( { key = '' } = {} ) {
            return `/${this.path.replace( '(:gameId)', key )}`;
        },
    },
};

export default ROUTES;
