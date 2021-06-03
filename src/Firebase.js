import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCLWIJrgUVktQP-egTirtaVOsqymvCFVDA",
  authDomain: "react-spa-d1627.firebaseapp.com",
  databaseURL: "https://react-spa-d1627-default-rtdb.firebaseio.com",
  projectId: "react-spa-d1627",
  storageBucket: "react-spa-d1627.appspot.com",
  messagingSenderId: "561751695634",
  appId: "1:561751695634:web:29ad30e40b6d162e7513cb",
  measurementId: "G-R50QMRN859",
};
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
