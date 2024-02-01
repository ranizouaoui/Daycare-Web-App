// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAkQKhQv0oO0bGJFS8zTUKNauHHhHyrPvY",
    authDomain: "garderie-4d895.firebaseapp.com",
    projectId: "garderie-4d895",
    storageBucket: "garderie-4d895.appspot.com",
    messagingSenderId: "357004146400",
    appId: "1:357004146400:web:d247bf7fc623b29b078285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;