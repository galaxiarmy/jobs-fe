// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgGE2O5nQeyEAOdFYAv6EJgsLz6mjNnBc",
  authDomain: "dansfe-83055.firebaseapp.com",
  projectId: "dansfe-83055",
  storageBucket: "dansfe-83055.appspot.com",
  messagingSenderId: "152862975499",
  appId: "1:152862975499:web:7662e5aa8982e746edc90e",
  measurementId: "G-6FYD0CLDYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };