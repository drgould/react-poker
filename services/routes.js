

const ROUTES = {
    HOME : {
        path : '/',
        getUrl() {
            return this.path;
        }
    },
    ROOM : {
        path : 'r/(:roomName)',
        getUrl( { roomName='' }={} ) {
            console.log( this.path, roomName );
            return this.path.replace( '(:roomName)', roomName );
        }
    },
    GAME : {
        path : 'g/(:gameId)',
        getUrl( { gameId='' }={} ) {
            return this.path.replace( '(:gameId)', gameId );
        }
    },
};

export default ROUTES;
