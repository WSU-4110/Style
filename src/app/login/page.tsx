/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('rememberedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);

      if (user.rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('rememberedUser');
      }

      // Redirect to the Portfolio page after successful login
      router.push("/Portfolio");

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login failed', error.message);
        switch (error.response.status) {
          case 400:
            setError("User does not exist");
            break;
          case 300:
            setError("Invalid email format");
            break;
          case 401:
            setError("Account not activated");
            break;
          case 500:
            setError("Invalid login credentials");
            break;
          default:
            setError("An unexpected error occurred");
        }
      } else {
        console.error('An unexpected error occurred', error);
        setError("An unexpected error occurred");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={onLogin} className="w-full max-w-md">
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="w-full p-3 mt-2 border rounded-md"
          />
          <label htmlFor="password" className="block text-sm text-gray-600 mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="•••••••••••"
            required
            className="w-full p-3 mt-2 border rounded-md"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={user.rememberMe}
              onChange={() => setUser((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              Remember Me
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
          <a href="#" onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
            {isLogin ? 'Create Account' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}
