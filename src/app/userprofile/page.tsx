'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function UserProfile() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout functionality here (e.g., clearing session or token)
    alert('Logging out...');
    router.push('/login'); // Redirect back to the login page after logging out
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="container max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Your Profile</h1>

        {/* Placeholder Profile Content */}
        <p className="text-lg text-gray-700 mb-6">This is your profile page.</p>

        {/* Actions */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition mb-4"
          >
            Go to Homepage
          </button>
          <br />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
