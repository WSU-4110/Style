
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
  const [showSaveMessage, setShowSaveMessage] = useState(false);

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
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
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
    const confirmation = confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    );

    if (!confirmation) return;

    // Uncomment the following block to enable delete functionality
    // try {
    //   const response = await fetch('/api/userprofile', {
    //     method: 'DELETE',
    //   });

    //   if (response.ok) {
    //     alert('Profile deleted successfully!');
    //     router.push('homepage');
    //   } else {
    //     const error = await response.json();
    //     alert(`Error: ${error.message}`);
    //   }
    // } catch (error) {
    //   console.error('Error deleting profile:', error);
    //   alert('Failed to delete profile. Please try again.');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray p-12">
      <div className="max-w-8xl w-full bg-white border border-gray-200 rounded-md shadow-lg p-10 mt-[-20px]">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Welcome, {email || 'User'}!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div
                className="relative w-48 h-48 rounded-full border-2 border-gray-900 cursor-pointer shadow-md"
                onClick={triggerProfileUpload}
              >
                {prof_pic_preview ? (
                  <img
                    src={prof_pic_preview}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    Click to Upload
                  </div>
                )}
                <input
                  type="file"
                  ref={profileInputRef}
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-[#d8ba7a] text-white px-4 py-2 rounded-lg shadow hover:bg-[#b49144]"
              >
                Save Profile
              </button>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => set_fullname(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8ba7a]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City*
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => set_city(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8ba7a]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8ba7a]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone_number}
                    onChange={(e) => set_phone_number(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8ba7a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => set_bio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8ba7a]"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="mt-10 bg-gray-50 border border-gray-900 rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
          <p><strong>Name:</strong> {fullname || 'Not Provided'}</p>
          <p><strong>City:</strong> {city || 'Not Provided'}</p>
          <p><strong>Email:</strong> {email || 'Not Provided'}</p>
          <p><strong>Phone:</strong> {phone_number || 'Not Provided'}</p>
          <p><strong>Bio:</strong> {bio || 'Not Provided'}</p>
        </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handleDeleteProfile}
          className="mt-8 bg-[#212424] text-white px-4 py-2 rounded-lg shadow hover:bg-black"
        >
          Delete Profile
        </button>
      </div>
        {showSaveMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-[#d8ba7a] px-4 py-2 rounded-lg shadow">
            Profile saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}
