import Rebase from 're-base';
import firebase from 'firebase';

export const app = firebase.initializeApp( {
    apiKey: "AIzaSyDjy69hHvl0rm_QiHLJExANoB6efnsbB0E",
    authDomain: "hold-em-helper.firebaseapp.com",
    databaseURL: "https://hold-em-helper.firebaseio.com",
    storageBucket: "hold-em-helper.appspot.com",
    messagingSenderId: "584008103133",
} );

export default Rebase.createClass( app.database() );
