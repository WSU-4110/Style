/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './portfolio.css'; // Import the portfolio-specific CSS

export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [services, setServices] = useState([{ name: '', price: '', time: '' }]);
  
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2; // Increase drag speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
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
          <div
            className="carousel"
            ref={carouselRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {photos && Array.from(photos).map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt={`Carousel ${index}`} className="carousel-image" />
            ))}
          </div>
        </div>

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
