// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import firebase from "firebase";
// apiKey: "AIzaSyBrlOTkWk_tCvhMBTSP-1TfKbmvKuuETF_s",
// authDomain: "hipal-10a554.firebaseapp.com",
// databaseURL: "https://hipal-10a554.firebaseio.com",
// projectId: "hipal-10a554",
// storageBucket: "hipal-10a554.appspot.com",
// messagingSenderId: "21824345209",
// appId: "0:21824345210:web:676367f6156449d9d017c3",
// measurementId: "G-81GNZFV89N",
// const config = {
//   apiKey: "AIzaSyBrlOTkWk_tCvhMBTSP0TfKbmvKuuETF_s",
//   authDomain: "hipal-9a554.firebaseapp.com",
//   databaseURL: "https://hipal-9a554.firebaseio.com",
//   projectId: "hipal-9a554",
//   storageBucket: "hipal-9a554.appspot.com",
//   messagingSenderId: "21824345210",
//   appId: "1:21824345210:web:676367f6156449d9d017c3",
//   measurementId: "G-80GNZFV89N",
// };

const config = {
  apiKey: "AIzaSyAkCKabeDPN-bVZhIRuw5675tAGL5ZQjiA",
  authDomain: "hipal-39192.firebaseapp.com",
  databaseURL: "https://hipal-39192.firebaseio.com",
  projectId: "hipal-39192",
  storageBucket: "hipal-39192.appspot.com",
  messagingSenderId: "787843758259",
  appId: "1:787843758259:web:0be01e86db9700486e98c6",
  measurementId: "G-G2KGZLFH79",
};

firebase.initializeApp(config);

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
// export const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const db = firebase.firestore();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export default firebase;
