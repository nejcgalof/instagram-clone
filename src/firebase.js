import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/firestore"; // for cloud firestore

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBCHRuQyDNDxVB2_n0d5kNU1iG1T_0PoWA",
  authDomain: "instagram-clone-react-29e41.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-29e41.firebaseio.com",
  projectId: "instagram-clone-react-29e41",
  storageBucket: "instagram-clone-react-29e41.appspot.com",
  messagingSenderId: "587127434177",
  appId: "1:587127434177:web:ca072a35a3a0643ca35d40",
  measurementId: "G-QMLDD5ED3F",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
