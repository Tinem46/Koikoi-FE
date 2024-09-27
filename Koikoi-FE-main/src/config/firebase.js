// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWEqpSw8UOhfwq5gDHnwKedndjG9qdV-Y",
  authDomain: "koi-store-e4863.firebaseapp.com",
  projectId: "koi-store-e4863",
  storageBucket: "koi-store-e4863.appspot.com",
  messagingSenderId: "145999206158",
  appId: "1:145999206158:web:4a5c3536cbe6a04bf0e95f",
  measurementId: "G-FQ8ZSN9KTW"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth();
export { googleProvider, auth };
