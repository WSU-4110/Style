'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { storage } from '../../firebase-config'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React from 'react';

export default function UserProfile() {
  const [fullname, set_fullname] = useState('');
  const [email, set_email] = useState('');
  const [city, set_city] = useState('');
  const [phone_number, set_phone_number] = useState('');
  const [prof_pic, set_profpic] = useState<File | null>(null);
  const [prof_pic_url, set_profpic_url] = useState<string | null>(null); // Store Firebase URL

  const profileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Upload to Firebase Storage
  const uploadToFirebase = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      set_profpic(file);

      // Upload to Firebase and set URL
      const url = await uploadToFirebase(file, 'profile_pictures');
      set_profpic_url(url);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Data to be sent to backend
    const payload = {
      fullname,
      email,
      city,
      phone_number,
      profile_picture: prof_pic_url
    };

    try {
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
              {prof_pic_url ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={prof_pic_url}
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
            className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition w-full"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
