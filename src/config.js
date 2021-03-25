import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import firebase from "firebase";

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

export const db = firebase.firestore();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export default firebase;
