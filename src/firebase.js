import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAIovGMSbEc29QLHIP8Cmr2rAUrAwYBePU",
    authDomain: "spl2-4b5b7.firebaseapp.com",
    databaseURL: "https://spl2-4b5b7.firebaseio.com",
    projectId: "spl2-4b5b7",
    storageBucket: "spl2-4b5b7.appspot.com",
    messagingSenderId: "788693166408",
    appId: "1:788693166408:web:dc9d6e564c7b66ac652b7d",
    measurementId: "G-5VVH8QPP08"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth()
export default firebase;