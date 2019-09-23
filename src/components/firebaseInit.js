import firebase, { storage, database } from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
