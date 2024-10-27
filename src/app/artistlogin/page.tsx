/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react'; // Import React explicitly
import { useRouter } from 'next/navigation';  // Import useRouter
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase functions
import { auth, googleProvider } from '../firebase';

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const router = useRouter(); // Correct usage of useRouter

  const toggleForms = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/portfolio'); // Redirect to portfolio
    } catch (error) {
      alert('Google login failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (isLogin) {
      // Login logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/portfolio'); // Redirect to portfolio
      } catch (error) {
        alert('Authentication failed. Please try again.');
      }
    } else {
      // Signup logic
      const confirmPassword = e.currentTarget.confirm_password.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Signup successful! Redirecting...');
        router.push('/portfolio'); // Redirect after successful signup
      } catch (error) {
        alert(`Signup failed: ${error.message}`);
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#f4d9a0] text-black py-2 px-4 rounded-lg mt-6 hover:bg-gray-600"
        >
          Login with Google
        </button>

        {isLogin ? (
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

            <button
              type="submit"
              className="w-full bg-teal-400 text-white py-2 px-4 rounded-lg mt-6 hover:bg-teal-600"
            >
              Login
            </button>
          </form>
        ) : (
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
            <button
              type="submit"
              className="w-full bg-teal-400 text-white py-2 px-4 rounded-lg mt-6 hover:bg-teal-600"
            >
              Create Account
            </button>
          </form>
        )}

        <p className="mt-4">
          {isLogin ? 'Need a Style account?' : 'Already have an account?'}{' '}
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
