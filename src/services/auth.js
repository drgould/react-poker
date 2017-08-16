import firebase from 'firebase';
import db from './db';

const google = new firebase.auth.GoogleAuthProvider();

export function signIn() {
    firebase.auth().signInWithPopup( google )
        .then( ( { credential, user } ) => {
            authState.user = user;
            if( credential ) {
                authState.token = credential.accessToken;
            }
            const data = {
                name : user.displayName,
                avatar : user.photoURL,
            };
            db.post( `/users/${ user.uid }`, { data } );
        } );
}

export function signOut() {
    firebase.auth().signOut();
}

export const authState = {
    user : undefined,
    token : undefined,
};

firebase.auth().onAuthStateChanged( function( user ) {
    authState.user = user;
    window.dispatchEvent( new Event( 'auth-state-change' ) );
} );

