/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import Navbar from '../components/navigationbar';

export default function UserProfile() {
  const [fullname, set_fullname] = useState('');
  const [email, set_email] = useState('');
  const [city, set_city] = useState('');
  const [phone_number, set_phone_number] = useState('');
  const [prof_pic, set_profpic] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Full Name:', fullname);
    console.log('City:', city);
    console.log('Email:', email);
    console.log('Phone Number:', phone_number);
    console.log('Profile Picture:', prof_pic);
  };

  const handleLogout = () => {
    // Handle logout functionality here (e.g., clearing session or token)
    alert('Logging out...');
    router.push('/login'); // Redirect back to the login page after logging out
  };

  const handlePfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      set_profpic(e.target.files[0]);
    }
  };
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray p-6"> {/*took out items-center justify-center for flex flex-col*/}
      <Navbar />
      <div className="container max-w-[60rem] p-12 bg-black shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#f4d9a0]">Your Profile</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-[#f4d9a0] text-left">Profile Picture</label>
            <input
              type="file"
              onChange={handlePfpUpload}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#f4d9a0] text-left">Name*</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => set_fullname(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <br/>

          <div className="mb-4">
            <label className="block text-[#f4d9a0] text-left">City*</label>
            <input
              type="text"
              value={city}
              onChange={(e) => set_city(e.target.value)}
              placeholder="Enter your city"
              className="w-full p-2 border rounded"
            />
          </div>
          <br/>

          <div className="mb-4">
            <label className="block text-[#f4d9a0] text-left">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <br/>

          <div className="mb-4">
            <label className="block text-[#f4d9a0] text-left">Phone Number (optional)</label>
            <input
              type="tel"
              value={phone_number}
              onChange={(e) => set_phone_number(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded"
            />
          </div>
          <br/>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition w-full"
          >
            Save Profile
          </button>
        </form>
        <div className="mt-8">
        </div>
      </div>
    </div>
  );
}