// File: src/app/auth.ts

import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

// Initialize Firebase Auth (if not already initialized)
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const loginWithGoogle = (): void => {
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
export const signupUser = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
};
