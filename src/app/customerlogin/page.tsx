/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react'; // Import React for component creation
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth'; // Import Firebase authentication functions
import { auth, googleProvider } from '../firebase'; // Import Firebase instance and Google provider

// Main CustomerLogin component
export default function CustomerLogin() {
  // State to toggle between login and sign-up forms
  const [isLogin, setIsLogin] = useState(true);
  // Initialize useRouter for navigation
  const router = useRouter();

  // Function to toggle between login and sign-up forms
  const toggleForms = () => {
    // Toggle form view based on the current state
    setIsLogin(!isLogin);
  };

  // Handle Google login using Firebase
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google provider
      await signInWithPopup(auth, googleProvider);
      // Redirect to User Profile page on successful login
      router.push('/userprofile');
    } catch (error) {
      // Display error message if login fails
      alert('Google login failed. Please try again.');
    }
  };

  // Handle form submission for both login and sign-up
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Get email and password input values from the form
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (isLogin) {
      // Login mode
      try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to User Profile page on successful login
        router.push('/userprofile');
      } catch (error) {
        // Display error message if authentication fails
        alert('Authentication failed. Please try again.');
      }
    } else {
      // Sign-up mode
      const confirmPassword = e.currentTarget.confirm_password.value;
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return; // Exit function if passwords don't match
      }

      try {
        // Create a new user account
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign up successful! Redirecting...');
        // Redirect to User Profile page on successful sign-up
        router.push('/userprofile');
      } catch (error) {
        // Display error message if sign-up fails
        alert(`Sign up failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-black shadow-lg rounded-lg">
        {/* Display appropriate title based on current form state */}
        <h1 className="text-4xl text-white font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        {isLogin ? (
          // Login form
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Email input for login */}
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

            {/* Password input for login */}
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
            {/* Email input for sign-up */}
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

            {/* Username input for sign-up */}
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

            {/* Password input for sign-up */}
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

            {/* Confirm password input for sign-up */}
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
