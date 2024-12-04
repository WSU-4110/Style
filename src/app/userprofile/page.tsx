
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
  const [bio, set_bio] = useState('');

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
    <div className="min-h-screen flex items-center justify-center bg-gray-00 p-12">
      <div className="container max-w-4xl p-10 bg-white border-4 border-[#f4d9a0] shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">Welcome, {email}!</h1>
  
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-start space-x-16">
              <div className="flex flex-col items-center space-y-8 w-1/3 border-r-2 border-[#f4d9a0] pr-12 mt-8">
                <div className="profile-picture-upload group">
                  <input
                    type="file"
                    ref={profileInputRef}
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="relative w-48 h-48 cursor-pointer mb-8">
                    {prof_pic_preview ? (
                      <img
                        className="w-full h-full rounded-full object-cover border-4 border-[#f4d9a0] shadow-lg"
                        src={prof_pic_preview}
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-200 opacity-0 group-hover:opacity-60 transition-opacity">
                      <img
                        className="w-10"
                        src="https://www.svgrepo.com/show/33565/upload.svg"
                        alt="Upload Icon"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition-all w-full max-w-xs"
                  >
                    Save Profile
                  </button>
  
                  <button
                    type="button"
                    onClick={handleDeleteProfile}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all w-full max-w-xs"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
  
              <div className="flex-1 space-y-6">
                <div className="form-input-group">
                  <label className="block text-black text-left font-semibold">Name*</label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => set_fullname(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4d9a0] transition"
                    required
                  />
                </div>
  
                <div className="form-input-group">
                  <label className="block text-black text-left font-semibold">City*</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => set_city(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4d9a0] transition"
                  />
                </div>
  
                <div className="form-input-group">
                  <label className="block text-black text-left font-semibold">Email*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4d9a0] transition"
                    required
                  />
                </div>
  
                <div className="form-input-group">
                  <label className="block text-black text-left font-semibold">Phone Number (optional)</label>
                  <input
                    type="tel"
                    value={phone_number}
                    onChange={(e) => set_phone_number(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4d9a0] transition"
                  />
                </div>
  
                <div className="form-input-group">
                  <label className="block text-black text-left font-semibold">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => set_bio(e.target.value)}
                    placeholder="Tell us a little about yourself"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4d9a0] transition"
                  />
                </div>
              </div>
            </div>
          </form>
  
          {/* Profile Summary */}
          <div className="mt-12 p-6 border-t-4 border-[#f4d9a0]">
            <h2 className="text-2xl font-semibold mb-4 text-black">Profile Summary</h2>
            <div className="text-black space-y-2">
              <p><strong>Name:</strong> {fullname ? fullname : "Not Provided"}</p>
              <p><strong>City:</strong> {city ? city : "Not Provided"}</p>
              <p><strong>Email:</strong> {email ? email : "Not Provided"}</p>
              <p><strong>Phone Number:</strong> {phone_number ? phone_number : "Not Provided"}</p>
              <p><strong>Bio:</strong> {bio ? bio : "Not Provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
}  