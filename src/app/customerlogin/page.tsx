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

// Main CustomerLogin component
export default function CustomerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);  // State to control the modal visibility
  const router = useRouter();

  const toggleForms = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/userprofile');
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(`Google login failed: ${errorMessage}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('role', 'customer');
        router.push('/userprofile');
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
        router.push('/userprofile');
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert(`Sign up failed: ${errorMessage}`);
      }
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('reset-email') as HTMLInputElement).value;

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent successfully!');
      setIsResetPasswordModalOpen(false);  // Close the modal
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(`Password reset failed: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-black shadow-lg rounded-lg">
        <h1 className="text-4xl text-white font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        {isLogin ? (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="login-email" className="block text-sm text-[#f4d9a0]">Email</label>
            <input
              type="text"
              id="login-email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            <label htmlFor="login-password" className="block text-sm text-[#f4d9a0] mt-4">Password</label>
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
              className="w-full bg-[#f4d9a0] text-black py-2 px-4 rounded-lg mt-6 hover:bg-gray-600"
            >
              Login
            </button>

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

            {/* Forgot Password Link */}
            <p
              onClick={() => setIsResetPasswordModalOpen(true)}
              className="mt-4 text-[#f4d9a0] cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
          </form>
        ) : (
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="createacc-email" className="block text-sm text-[#f4d9a0]">Email</label>
            <input
              type="email"
              id="createacc-email"
              name="email"
              placeholder="Email address"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            <label htmlFor="createacc-username" className="block text-sm text-[#f4d9a0] mt-4">Username</label>
            <input
              type="text"
              id="createacc-username"
              name="username"
              placeholder="Username"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            <label htmlFor="createacc-password" className="block text-sm text-[#f4d9a0] mt-4">Password</label>
            <input
              type="password"
              id="createacc-password"
              name="password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />

            <label htmlFor="createacc-confirm-password" className="block text-sm text-[#f4d9a0] mt-4">Confirm Password</label>
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
              className="w-full bg-[#f4d9a0] text-black py-2 px-4 drop-shadow-lg rounded-lg mt-6 hover:bg-gray-600"
            >
              Create Account
            </button>
          </form>
        )}

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

      {/* Modal for password reset */}
      {isResetPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
              <label htmlFor="reset-email" className="block text-sm text-[#333]">Email</label>
              <input
                type="email"
                id="reset-email"
                name="reset-email"
                required
                placeholder="Enter your email"
                className="w-full p-3 mt-2 border rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-[#f4d9a0] text-black py-2 px-4 rounded-lg mt-4"
              >
                Reset Password
              </button>
            </form>
            <button
              onClick={() => setIsResetPasswordModalOpen(false)}
              className="mt-4 text-[#f4d9a0] hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
