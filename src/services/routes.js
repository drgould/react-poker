

const ROUTES = {
    HOME : {
        path : '/',
        getUrl() {
            return this.path;
        },
    },
    ROOM : {
        path : 'r/(:roomName)',
        getUrl( { key = '' } = {} ) {
            return `/${this.path.replace( '(:roomName)', key )}`;
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
