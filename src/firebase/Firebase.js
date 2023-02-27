// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBErqUNvXHAUZUGvuhK2Z4fCOIUM-MMzI4",
  authDomain: "movierating-2fffa.firebaseapp.com",
  projectId: "movierating-2fffa",
  storageBucket: "movierating-2fffa.appspot.com",
  messagingSenderId: "44206471757",
  appId: "1:44206471757:web:70de7ace4152d07870ba04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const  movieRef = collection(db,'movies')
export const  reviewsRef = collection(db,'reviews')
export const  userRef = collection(db,'users')

export default app;