import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/auth"
import 'firebase/database';   
import 'firebase/firestore'; 
const firebaseConfig = {
    apiKey: "AIzaSyD7DbXNuqLTLHS2e4_NbXc_fYwIUPrPhoo",
    authDomain: "snapchat-93969.firebaseapp.com",
    projectId: "snapchat-93969",
    storageBucket: "snapchat-93969.appspot.com",
    messagingSenderId: "196298641679",
    appId: "1:196298641679:web:b6f9b479a61a2bfc0c6e7a",
    measurementId: "G-8BN66VPMP6"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {db,auth,storage,provider};