// Import necessary functions from Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ErM21A7dbnz-kZbmy0JUKgSw8rQjx48",
  authDomain: "style-438016.firebaseapp.com",
  databaseURL: "https://style-438016-default-rtdb.firebaseio.com",
  projectId: "style-438016",
  storageBucket: "style-438016.firebasestorage.app", // Make sure this doesn't get changed it's used to track the "pay as you go' model for google. Don't use the outdated appspot.com
  messagingSenderId: "237035198252",
  appId: "1:237035198252:web:edd415a2b70ba447557e89",
  // measurementId: "G-J687QSJY9C"
};


// Initialize Firebase only if no app has been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
