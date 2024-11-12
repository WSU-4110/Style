'use client'

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import './portfolio.css';
import Nav_bar from '../components/navbar_artist';

export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [services, setServices] = useState([{ name: '', price: '', time: '' }]);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setPhotos(newPhotos);
      setCurrentPhotoIndex(0);
    }
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...services];

    if (field === 'price') {
      // Handle price formatting (from previous logic)
      const cleanedValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
      const formattedValue = (parseFloat(cleanedValue) / 100).toFixed(2);
      updatedServices[index] = { ...updatedServices[index], [field]: formattedValue };
    } else if (field === 'time') {
      // Allow only numeric input for time
      const numericValue = value.replace(/[^0-9]/g, ''); // Filter non-numeric characters
      updatedServices[index] = { ...updatedServices[index], [field]: numericValue };
    } else {
      updatedServices[index] = { ...updatedServices[index], [field]: value };
    }

    setServices(updatedServices);
  };


  {/*Service Time Format*/}
  const formatTime = (minutes: string) => {
    const numericMinutes = parseInt(minutes, 10);
    if (isNaN(numericMinutes)) return '';

    const hours = Math.floor(numericMinutes / 60);
    const remainingMinutes = numericMinutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
  };


  const addService = () => {
    setServices([...services, { name: '', price: '', time: '' }]);
  };

  const deleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('business_name', businessName);
    formData.append('bio', bio);
    if (profilePicture) formData.append('profile_picture', profilePicture);
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

    services.forEach((service, index) => {
      formData.append(`services[${index}][name]`, service.name);
      formData.append(`services[${index}][price]`, service.price);
      formData.append(`services[${index}][time]`, service.time);
    });

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Portfolio saved successfully!');
        router.push('/appointments');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio. Please try again.');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="container">
      <Nav_bar />
      <div className="business-name">
        <input
          type="text"
          placeholder="Enter Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      </div>

      <div className="content-wrapper">
        {/* Carousel Section */}
        <div className="carousel-wrapper relative">
          {/* Profile Picture Upload */}
          <div
            className="profile-picture-upload group"
            onClick={triggerProfileUpload}
          >
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
            />
            <div className="relative w-full h-full">
              {profilePicture ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={URL.createObjectURL(profilePicture)}
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

          {/* Carousel Portfolio Photos Upload */}
          <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-[500px] w-[900px] overflow-hidden rounded-lg group">
              {photos.length > 0 ? (
                <div className="duration-700 ease-in-out">
                  <img
                    src={photos[currentPhotoIndex]}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Carousel ${currentPhotoIndex}`}
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-md"></div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                id="carousel-file-input"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />

              {/* File Upload Overlay */}
              <label
                htmlFor="carousel-file-input"
                className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer"
              >
                <img
                  className="w-10"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt="Upload Icon"
                />
              </label>
            </div>

            {/* Carousel Navigation */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                <svg
                  className="w-4 h-4 text-teal rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="teal" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                <svg
                  className="w-4 h-4 text-teal rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="teal" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="description-wrapper">
          <h2>Description</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short description"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="services-wrapper">
        <h2>Services Offered</h2>
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
              required
            />
            <div className="price-input-wrapper">
              <span className="price-prefix">$</span>
              <input
                type="text"
                placeholder="0.00"
                value={service.price}
                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                className="price-input"
                required
              />
            </div>
            <input
              type="text"
              placeholder="00:00"
              value={service.time}
              onChange={(e) => handleServiceChange(index, 'time', e.target.value)}
              className="time-input"
              required
            />
            <button type="button" onClick={() => deleteService(index)} className="delete-service-button">
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={addService} className="add-service-button">
          + Add Service
        </button>
      </div>

      <button type="submit" onClick={handleSubmit} className="button">
        Save Portfolio
      </button>
      <button onClick={handleGoBack} className="button mt-6">
        Go Back to Homepage
      </button>
    </div>
  );
}
