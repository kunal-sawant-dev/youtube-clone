// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZwZ0Rvd_GbJwZGY9NnGrHE5S6KpWmCws",
  authDomain: "fir-aef06.firebaseapp.com",
  projectId: "fir-aef06",
  storageBucket: "fir-aef06.firebasestorage.app",
  messagingSenderId: "823147359787",
  appId: "1:823147359787:web:332e3852686403c76b846e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider= new GoogleAuthProvider()
export {auth,provider}
