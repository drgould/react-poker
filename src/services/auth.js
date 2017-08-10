import firebase from 'firebase';
import db from './db';

const google = new firebase.auth.GoogleAuthProvider();

export function signInUser() {
    firebase.auth.signInWithPopup( google )
        .then( ( { credential, user } ) => {
            authState.user = user;
            if( credential ) {
                authState.token = credential.accessToken;
            }
            db.push( `/users/${ user.uid }`, {
                name : user.displayName,
                avatar : user.photoURL,
            } );
        } );
}

export const authState = {
    user : undefined,
    token : undefined,
};

firebase.auth().onAuthStateChanged( function( user ) {
    authState.user = user;
    window.dispatchEvent( new Event( 'auth-state-change' ) );
} );

