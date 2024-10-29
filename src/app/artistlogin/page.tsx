/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react'; // Import React for component creation
import { useRouter } from 'next/navigation';  // Import useRouter for client-side navigation
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication functions
import { auth, googleProvider } from '../firebase'; // Import Firebase instance and Google provider

// Main Login component
export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true); // State to toggle between login and sign up
  const router = useRouter(); // Initialize useRouter for navigation

  // Function to toggle between login and sign up forms
  const toggleForms = () => {
    setIsLogin(!isLogin); // Switch form view based on current state
  };

  // Handle Google login using Firebase
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Sign in with Google
      router.push('/portfolio'); // Redirect to portfolio on success
    } catch (error) {
      alert('Google login failed. Please try again.'); // Show error message
    }
  };

  // Handle form submission for both login and sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    const email = e.currentTarget.email.value; // Get email input
    const password = e.currentTarget.password.value; // Get password input

    if (isLogin) {
      // If in login mode
      try {
        await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
        router.push('/portfolio'); // Redirect to portfolio on success
      } catch (error) {
        alert('Authentication failed. Please try again.'); // Show error message
      }
    } else {
      // If in sign up mode
      const confirmPassword = e.currentTarget.confirm_password.value; // Get confirm password input
      if (password !== confirmPassword) {
        // Check if passwords match
        alert('Passwords do not match. Please try again.'); // Show error message
        return; // Exit function if passwords don't match
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password); // Create a new user
        alert('Sign up successful! Redirecting...'); // Show success message
        router.push('/portfolio'); // Redirect to portfolio on success
      } catch (error) {
        alert(`Sign up failed: ${error.message}`); // Show error message
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'} {/* Display appropriate title */}
        </h1>

        {isLogin ? (
          // Login form
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="login-email" className="block text-sm text-gray-600">
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
            <label htmlFor="login-password" className="block text-sm text-gray-600 mt-4">
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
              className="w-full bg-teal-400 text-white py-2 px-4 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-600"
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
          // Sign up form
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="createacc-email" className="block text-sm text-gray-600">
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
            <label htmlFor="createacc-username" className="block text-sm text-gray-600 mt-4">
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
            <label htmlFor="createacc-password" className="block text-sm text-gray-600 mt-4">
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
            <label htmlFor="createacc-confirm-password" className="block text-sm text-gray-600 mt-4">
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
            {/* Submit button for sign up */}
            <button
              type="submit"
              className="w-full bg-teal-400 text-white py-2 px-4 drop-shadow-lg rounded-lg mt-6 hover:bg-teal-600"
            >
              Create Account
            </button>
          </form>
        )}

        <p className="mt-4">
          {isLogin ? 'Need a Style account?' : 'Already have an account?'}{' '}
          {/* Display link to switch forms */}
          <a
            href="#"
            onClick={toggleForms}
            className="text-teal-600 hover:underline"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}
