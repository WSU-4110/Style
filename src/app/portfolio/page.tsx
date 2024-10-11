/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './portfolio.css';

export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [services, setServices] = useState([{ name: '', price: '', time: '' }]);

  const router = useRouter();

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setPhotos(newPhotos);
    }
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { name: '', price: '', time: '' }]);
  };

  const deleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business Name:', businessName);
    console.log('Bio:', bio);
    console.log('Profile Picture:', profilePicture);
    console.log('Photos:', photos);
    console.log('Services:', services);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="container">
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
        <div className="carousel-wrapper">
          <div className="profile-picture-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
            {profilePicture && <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="profile-picture" />}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {photos.map((photo, index) => (
                <div key={index} className={`hidden duration-700 ease-in-out`} data-carousel-item>
                  <img src={photo} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Carousel ${index}`} />
                </div>
              ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {photos.map((_, index) => (
                <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current={index === 0} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
              ))}
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                <svg className="w-4 h-4 text-teal rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                  <path stroke="teal" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                <svg className="w-4 h-4 text-teal rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                  <path stroke="teal" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Move Description Below Carousel */}
        <div className="description-wrapper">
          <h2>Description</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short description"
          />
        </div>
      </div>

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
            <input
              type="text"
              placeholder="Price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Time"
              value={service.time}
              onChange={(e) => handleServiceChange(index, 'time', e.target.value)}
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
