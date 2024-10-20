// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1ErM21A7dbnz-kZbmy0JUKgSw8rQjx48",
  authDomain: "style-438016.firebaseapp.com",
  projectId: "style-438016",
  storageBucket: "style-438016.appspot.com",
  messagingSenderId: "237035198252",
  appId: "1:237035198252:web:edd415a2b70ba447557e89",
  measurementId: "G-J687QSJY9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);