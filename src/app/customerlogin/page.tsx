/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// Main CustomerLogin component
export default function CustomerLogin() {
  // State to toggle between login and sign-up forms
  const [isLogin, setIsLogin] = useState(true);
  // Initialize useRouter for client-side navigation
  const router = useRouter();

  // Function to toggle between login and sign-up forms
  const toggleForms = () => {
    // Switch form view based on current state
    setIsLogin(!isLogin);
  };

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      // Sign in using Google provider
      await signInWithPopup(auth, googleProvider);
      // Redirect to user profile page after successful login
      router.push('/userprofile');
    } catch (error) {
      // Display error message if Google login fails
      const errorMessage = (error as Error).message;
      alert(`Google login failed: ${errorMessage}`);
    }
  };

  // Handle form submission for login and sign-up
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Retrieve email and password from form inputs
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (isLogin) {
      // Login mode
      try {
        // Authenticate using email and password
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to user profile page after successful login
        router.push('/userprofile');
      } catch (error) {
        // Display error message if authentication fails
        const errorMessage = (error as Error).message;
        alert(`Authentication failed: ${errorMessage}`);
      }
    } else {
      // Sign-up mode
      const confirmPassword = (form.elements.namedItem('confirm_password') as HTMLInputElement).value;
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return; // Exit function if passwords don't match
      }

      try {
        // Create a new user account
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign up successful! Redirecting...');
        // Redirect to user profile page after successful sign-up
        router.push('/userprofile');
      } catch (error) {
        // Display error message if sign-up fails
        const errorMessage = (error as Error).message;
        alert(`Sign up failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-black shadow-lg rounded-lg">
        {/* Display the appropriate title based on current form state */}
        <h1 className="text-4xl text-white font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        {isLogin ? (
          // Login form
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Email input field for login */}
            <label htmlFor="login-email" className="block text-sm text-[#f4d9a0]">
              Email
            </label>
            <input
              type="text"
              id="login-email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Password input field for login */}
            <label htmlFor="login-password" className="block text-sm text-[#f4d9a0] mt-4">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Submit button for login */}
            <button
              type="submit"
              className="w-full bg-[#f4d9a0] text-black py-2 px-4 rounded-lg mt-6 hover:bg-gray-600"
            >
              Login
            </button>

            {/* Google login button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full bg-white text-black py-2 px-4 flex items-center justify-center gap-2 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-200"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                alt="Google logo"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
              Login with Google
            </button>
          </form>
        ) : (
          // Sign-up form
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Email input field for sign-up */}
            <label htmlFor="createacc-email" className="block text-sm text-[#f4d9a0]">
              Email
            </label>
            <input
              type="email"
              id="createacc-email"
              name="email"
              placeholder="Email address"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Username input field for sign-up */}
            <label htmlFor="createacc-username" className="block text-sm text-[#f4d9a0] mt-4">
              Username
            </label>
            <input
              type="text"
              id="createacc-username"
              name="username"
              placeholder="Username"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Password input field for sign-up */}
            <label htmlFor="createacc-password" className="block text-sm text-[#f4d9a0] mt-4">
              Password
            </label>
            <input
              type="password"
              id="createacc-password"
              name="password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Confirm password input field for sign-up */}
            <label htmlFor="createacc-confirm-password" className="block text-sm text-[#f4d9a0] mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="createacc-confirm-password"
              name="confirm_password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            {/* Submit button for sign-up */}
            <button
              type="submit"
              className="w-full bg-[#f4d9a0] text-black py-2 px-4 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-600"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Link to toggle between login and sign-up forms */}
        <p className="mt-4 text-white">
          {isLogin ? 'Need a Style account?' : 'Already have an account?'}{' '}
          <a
            href="#"
            onClick={toggleForms}
            className="text-[#f4d9a0] hover:underline"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}
