
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import React from 'react';

export default function UserProfile() {
  const [fullname, set_fullname] = useState('');
  const [email, set_email] = useState('');
  const [city, set_city] = useState('');
  const [phone_number, set_phone_number] = useState('');
  const [prof_pic, set_profpic] = useState<File | null>(null);
  const [prof_pic_preview, set_profpic_preview] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('city', city);
    formData.append('phone_number', phone_number);
    if (prof_pic) {
      formData.append('profile_picture', prof_pic);
    }

    try {
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Profile saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    alert('Logging out...');
    router.push('/login');
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      set_profpic(file);
      set_profpic_preview(URL.createObjectURL(file));
    }
  };

  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        set_email(user.email || ''); 
        set_fullname(user.displayName || ''); 
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleDeleteProfile = async () => {
    const confirmation = confirm('Are you sure you want to delete your profile? This action cannot be undone.');
  
    if (!confirmation) return;
  
    try {
      const response = await fetch('/api/userprofile', {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Profile deleted successfully!');
        router.push('homepage'); 
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray p-6">
      <div className="container max-w-4xl p-12 bg-white border-4 border-[#f4d9a0] shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-5 text-black">Your Profile</h1>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="profile-picture-upload group" onClick={triggerProfileUpload}>
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
            />
            <div className="relative w-24 h-24 cursor-pointer">
              {prof_pic_preview ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={prof_pic_preview}
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full"></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-200 opacity-0 group-hover:opacity-60 transition-opacity">
                <img
                  className="w-8"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt="Upload Icon"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <br />
            <label className="block text-black text-left">Name*</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => set_fullname(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded text-black"
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
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-left">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded text-black"
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
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition w-full mb-5"
          >
            Save Profile

          </button>
        </form>
        {/* Delete Profile Button */}
          <button
            type="button"
            onClick={handleDeleteProfile}
            className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition w-full mb-10"
      >
        Delete Profile
      </button>
      </div>
    </div>
  );
}