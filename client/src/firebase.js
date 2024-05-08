// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "peakaid-32c02.firebaseapp.com",
  projectId: "peakaid-32c02",
  storageBucket: "peakaid-32c02.appspot.com",
  messagingSenderId: "1027200290586",
  appId: "1:1027200290586:web:591fe83212ef5ef55c66a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);