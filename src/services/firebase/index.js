// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyBJLMg5YCDmH1Kus1luMagMu9_-g4o0QU4",
  authDomain: "location-app-6d63b.firebaseapp.com",
  projectId: "location-app-6d63b",
  storageBucket: "location-app-6d63b.appspot.com",
  messagingSenderId: "217882888957",
  appId: "1:217882888957:web:4cb83eeaebf520aeb28c94"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
