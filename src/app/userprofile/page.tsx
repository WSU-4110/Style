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
  const [prof_pic_preview, set_profpic_preview] = useState<string | null>(null);
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
    alert('Logging out...');
    router.push('/login');
  };

  const handlePfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      set_profpic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        set_profpic_preview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray p-6">
      <Navbar />
      <div className="container max-w-4xl p-12 bg-white border-4 border-[#f4d9a0] shadow-lg rounded-lg text-center"> {/* Changed bg-black to white and added golden border */}
        <h1 className="text-4xl font-bold mb-5 text-black">Your Profile</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/*<label className="block text-black text-left">Profile Picture</label>*/}
            <div className="flex justify-center mb-2">
              <div className="w-24 h-24 border-4 border-[#f4d9a0] rounded-full flex items-center justify-center bg-transparent">
                {prof_pic_preview ? (
                  <img
                    src={prof_pic_preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-[#f4d9a0] text-s"> Upload image</span>
                )}
              </div>
            </div>
            <input
              type="file"
              onChange={handlePfpUpload}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <br />
            <label className="block text-black text-left">Name*</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => set_fullname(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded text-white" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-left">City*</label>
            <input
              type="text"
              value={city}
              onChange={(e) => set_city(e.target.value)}
              placeholder="Enter your city"
              className="w-full p-2 border rounded text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-left">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-left">Phone Number (optional)</label>
            <input
              type="tel"
              value={phone_number}
              onChange={(e) => set_phone_number(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded text-white" 
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition w-full" // Changed button color to black
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}