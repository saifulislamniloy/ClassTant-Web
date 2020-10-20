import * as firebase from 'firebase/app';
import "@react-firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAIovGMSbEc29QLHIP8Cmr2rAUrAwYBePU",
    authDomain: "spl2-4b5b7.firebaseapp.com",
    databaseURL: "https://spl2-4b5b7.firebaseio.com",
    projectId: "spl2-4b5b7",
    storageBucket: "spl2-4b5b7.appspot.com",
    messagingSenderId: "788693166408",
    appId: "1:788693166408:web:8e78af511aa2641b652b7d",
    measurementId: "G-TL8C1EQZNN"
});

export default app;