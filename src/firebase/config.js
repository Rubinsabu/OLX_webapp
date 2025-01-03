// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage' //Import storage



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5nJ_HQEHopi4KpN3wlf7VsUJ4SFbKKsQ",
  authDomain: "olx-project-4ba3a.firebaseapp.com",
  projectId: "olx-project-4ba3a",
  storageBucket: "olx-project-4ba3a.appspot.com",
  messagingSenderId: "633752092198",
  appId: "1:633752092198:web:40c5a0bc336e269d6e70e7",
  measurementId: "G-DNBQGGV28H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};
//export default Firebase = firebase.initializeApp(firebaseConfig)
