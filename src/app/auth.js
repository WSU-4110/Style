import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from './src/app/firebase.js'; // Ensure the path is correct

const provider = new GoogleAuthProvider();

// Function to sign in with Google
const loginWithGoogle = (): void => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Logged in with Google:', user);
    })
    .catch((error) => {
      console.error('Error during Google sign-in:', error);
    });
};

// Function to sign up with email and password
const signupUser = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
};
