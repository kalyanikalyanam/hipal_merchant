import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBrlOTkWk_tCvhMBTSP0TfKbmvKuuETF_s",
  authDomain: "hipal-9a554.firebaseapp.com",
  databaseURL: "https://hipal-9a554.firebaseio.com",
  projectId: "hipal-9a554",
  storageBucket: "hipal-9a554.appspot.com",
  messagingSenderId: "21824345210",
  appId: "1:21824345210:web:676367f6156449d9d017c3",
  measurementId: "G-80GNZFV89N"
};


firebase.initializeApp(config);

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
// export const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export default firebase;