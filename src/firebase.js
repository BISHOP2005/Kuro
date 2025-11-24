// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBL-X1Sl1NAIrm7YoJMw2ChO0QgtNPztAg",
    authDomain: "kuro-ccf9c.firebaseapp.com",
    databaseURL: "https://kuro-ccf9c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kuro-ccf9c",
    storageBucket: "kuro-ccf9c.firebasestorage.app",
    messagingSenderId: "367033183970",
    appId: "1:367033183970:web:20059014d45c4e1e04f8bb",
    measurementId: "G-M06EZ4S97B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
