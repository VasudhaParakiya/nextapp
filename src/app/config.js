// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaq806V5n4N9PO3rkhW8PAAyXnZg_uxHw",
  authDomain: "authapp-5dc9a.firebaseapp.com",
  projectId: "authapp-5dc9a",
  storageBucket: "authapp-5dc9a.appspot.com",
  messagingSenderId: "231504107867",
  appId: "1:231504107867:web:7bf95b52d8af2edf93227e",
  measurementId: "G-QGYHLVSBJQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
