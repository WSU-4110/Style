// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth"; // Import auth
import { getFirestore } from "firebase/firestore"; // Import Firestore if needed
import { getStorage } from "firebase/storage"; // Added import for Storage


// Style web app's Firebase configuration
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
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage
const firebaseApp = initializeApp(firebaseConfig);  // Create firebaseApp
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, storage, firebaseApp};