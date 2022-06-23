import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    //   apiKey: "AIzaSyDfF5fuJiJdNebkak3hC8srEm7WoIU6x4c",
    //   authDomain: "coinhomes-v2.firebaseapp.com",
    //   projectId: "coinhomes-v2",
    //   storageBucket: "coinhomes-v2.appspot.com",
    //   messagingSenderId: "455343782638",
    //   appId: "1:455343782638:web:f92990a992dc74f1ee51ff",
    //   measurementId: "G-FRMBE28DBK"

    apiKey: "AIzaSyCNpe3cuAch3ZS3Zi0NcQoRVfZ7ZANZedo",
    authDomain: "phoneauth-9a767.firebaseapp.com",
    projectId: "phoneauth-9a767",
    storageBucket: "phoneauth-9a767.appspot.com",
    messagingSenderId: "602917165745",
    appId: "1:602917165745:web:0827e929a8538b0a52e090"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var auth = getAuth();
// const storage = firebase.storage();
const db = getFirestore()

export { db, auth };
export default app