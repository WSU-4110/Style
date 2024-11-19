// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ErM21A7dbnz-kZbmy0JUKgSw8rQjx48",
  authDomain: "style-438016.firebaseapp.com",
  databaseURL: "https://style-438016-default-rtdb.firebaseio.com",
  projectId: "style-438016",
  storageBucket: "style-438016.firebasestorage.app",
  messagingSenderId: "237035198252",
  appId: "1:237035198252:web:edd415a2b70ba447557e89",
  measurementId: "G-J687QSJY9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Added Firebase Authentication
const analytics = getAnalytics(app);

export { app, auth };
