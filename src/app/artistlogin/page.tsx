/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// Main Login component
export default function Login() {
  // State to toggle between login and sign-up forms
  const [isLogin, setIsLogin] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false); // State to manage the reset password modal
  const [emailForReset, setEmailForReset] = useState(''); // State for the email input in reset modal
  const router = useRouter();

  // Toggle between login and sign-up forms
  const toggleForms = () => {
    setIsLogin(!isLogin);
  };

  // Handle Google login process
  const handleGoogleLogin = async () => {
    try {
      // Sign in using Google provider
      await signInWithPopup(auth, googleProvider);
      // Redirect to portfolio page after successful login
      const role = "artist";
      localStorage.setItem('role', role);
      router.push('/portfolio');
    } catch (error) {
      // Display error message if Google login fails
      const errorMessage = (error as Error).message;
      alert(`Google login failed: ${errorMessage}`);
    }
  };

  // Handle form submission for login and sign-up
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('role', 'artist');
        router.push('/portfolio');
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert(`Authentication failed: ${errorMessage}`);
      }
    } else {
      const confirmPassword = (form.elements.namedItem('confirm_password') as HTMLInputElement).value;
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign up successful! Redirecting...');
        localStorage.setItem('role', 'artist');
        router.push('/portfolio');
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert(`Sign up failed: ${errorMessage}`);
      }
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (emailForReset) {
      try {
        await sendPasswordResetEmail(auth, emailForReset);
        alert('Password reset email sent. Please check your inbox.');
        setShowResetModal(false); // Close the modal after sending email
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert(`Error sending reset email: ${errorMessage}`);
      }
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        {isLogin ? (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Email input field */}
            <label htmlFor="login-email" className="block text-sm text-gray-600">Email</label>
            <input type="text" id="login-email" name="email" placeholder="Enter your email" required className="w-full p-3 mt-2 border rounded-md" />

            {/* Password input field */}
            <label htmlFor="login-password" className="block text-sm text-gray-600 mt-4">Password</label>
            <input type="password" id="login-password" name="password" placeholder="•••••••••••" required className="w-full p-3 mt-2 border rounded-md" />

            {/* Submit button */}
            <button type="submit" className="w-full bg-teal-400 text-white py-2 px-4 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-600">Login</button>

            {/* Google login button */}
            <button onClick={handleGoogleLogin} type="button" className="w-full bg-white text-black py-2 px-4 flex items-center justify-center gap-2 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-200">
              <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="Google logo" className="w-10 h-10 object-contain drop-shadow-lg" />
              Login with Google
            </button>

            {/* Forgot password link */}
            <p className="mt-4 text-teal-600 cursor-pointer" onClick={() => setShowResetModal(true)}>Forgot Password?</p>
          </form>
        ) : (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Sign-up form fields */}
            {/* ... */}
          </form>
        )}

        {/* Link to toggle between login and sign-up forms */}
        <p className="mt-4">
          {isLogin ? 'Need a Style account?' : 'Already have an account?'}{' '}
          <a href="#" onClick={toggleForms} className="text-teal-600 hover:underline">
            {isLogin ? 'Create Account' : 'Login'}
          </a>
        </p>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <label htmlFor="reset-email" className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="reset-email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="bg-teal-400 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
