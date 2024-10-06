/* eslint-disable @typescript-eslint/no-unused-vars */


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);

  const router = useRouter(); // Initialize useRouter hook for navigation

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., save data to the backend)
    console.log('Business Name:', businessName);
    console.log('Bio:', bio);
    console.log('Description:', description);
    console.log('Photos:', photos);
  };

  const handleGoBack = () => {
    router.push('/'); // Navigate back to the homepage
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Your Portfolio</h1>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Business Name */}
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-sm text-gray-600">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm text-gray-600">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio about yourself"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your business or services"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
          </div>

          {/* Photos */}
          <div className="mb-6">
            <label htmlFor="photos" className="block text-sm text-gray-600">
              Upload Photos
            </label>
            <input
              type="file"
              id="photos"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-2 mt-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Portfolio
          </button>
        </form>

        {/* Go Back to Homepage Button */}
        <button
          onClick={handleGoBack}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-gray-600"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
}
