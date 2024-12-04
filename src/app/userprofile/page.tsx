
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
    <div className="min-h-screen flex items-center justify-center bg-gray p-16">
      <div className="container max-w-5xl p-14 bg-white border border-gray-300 shadow-xl rounded-lg relative ">
        <h1 className="text-3xl font-bold mb-10 text-gray-800 text-center">
          Welcome, {email}!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex space-x-10">
            {/* Profile Picture Section */}
            <div className="w-1/3">
              <div className="flex flex-col items-center space-y-8">
                <div
                  className="relative mr-10 w-48 h-48 cursor-pointer"
                  onClick={triggerProfileUpload}
                >
                  {prof_pic_preview ? (
                    <img
                      src={prof_pic_preview}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full"></div>
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
                  type="button"
                  className=" bg-green-600 text-white py-2 px-2 w-30rounded-lg shadow mr-10 hover:bg-green-700"
                >
                  Save Profile
                </button>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="flex-1 space-y-20">
              <div className="grid grid-cols-2 gap-20">
                <div>
                  <label className="block font-semibold text-gray-700">
                    Name*
                  </label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => set_fullname(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    City*
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => set_city(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-20">
                <div>
                  <label className="block font-semibold text-gray-700">
                    Email*
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone_number}
                    onChange={(e) => set_phone_number(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => set_bio(e.target.value)}
                  placeholder="Tell us a little about yourself"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Profile Summary */}
        <div className="absolute bottom-5 left-6 p-4 bg-gray-100 border rounded-lg shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Profile Summary
          </h2>
          <div className="text-gray-700 space-y-1">
            <p>
              <strong>Name:</strong> {fullname || 'Not Provided'}
            </p>
            <p>
              <strong>City:</strong> {city || 'Not Provided'}
            </p>
            <p>
              <strong>Email:</strong> {email || 'Not Provided'}
            </p>
            <p>
              <strong>Phone:</strong> {phone_number || 'Not Provided'}
            </p>
            <p>
              <strong>Bio:</strong> {bio || 'Not Provided'}
            </p>
          </div>
        </div>

        {/* Delete Profile Button */}
        <button
          onClick={handleDeleteProfile}
          className="absolute bottom-6 right-6 bg-red-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-red-600 shadow"
        >
          Delete
        </button>

        {/* Save Success Message */}
        {showSaveMessage && (
          <div className="absolute top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
            Profile saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}
