import auth from 'firebase/auth';

export default {
    user : undefined,
};

auth().onAuthStateChanged( function( user ) {
    authState.user = user;
    window.dispatchEvent( new Event( 'auth-state-change' ) );
} );
