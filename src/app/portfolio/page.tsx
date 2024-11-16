'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import './portfolio.css';
import Nav_bar from '../components/navbar_artist';
import SocialMediaInput from '../components/socialmediainput'; // Default import (no curly braces)

export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [services, setServices] = useState([{ name: '', price: '', time: '' }]);
  const [showBusinessHours, setShowBusinessHours] = useState(false);
  const [businessHours, setBusinessHours] = useState<{ [key: string]: { open: string; close: string } }>({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [socialLinks, setSocialLinks] = useState<{ platform: string, url: string }[]>([
    { platform: 'Instagram', url: '' },
    { platform: 'Facebook', url: '' },
    { platform: 'Twitter', url: '' }
  ]);

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

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setSocialLinks(updatedLinks);
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
    socialLinks.forEach((link, index) => {
      formData.append(`socialLinks[${index}][platform]`, link.platform);
      formData.append(`socialLinks[${index}][url]`, link.url);
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

  const toggleBusinessHours = () => {
    setShowBusinessHours(!showBusinessHours);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleHourChange = (day: string, field: 'open' | 'close', value: string) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSaveBusinessHours = () => {
    alert('Business hours saved successfully!');
    setShowBusinessHours(false);
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
        {/* Carousel Wrapper */}
        <div className="carousel-wrapper relative">
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

              <input
                type="file"
                id="carousel-file-input"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />

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

          {/* About Section */}
          <div className="description-wrapper">
            <h2>About</h2>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short description"
            />
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
                  placeholder="Enter time (e.g., 1 hour)"
                  value={service.time}
                  onChange={(e) => handleServiceChange(index, 'time', e.target.value)}
                  className="time-input"
                />
                <button type="button" onClick={() => deleteService(index)} className="delete-service-button">
                  Delete
                </button>
              </div>
            ))}
            <button type="button" onClick={addService} className="add-service-button">
              + Add Service
            </button>

            {/* Save Portfolio Button */}
            <div className="actions-container">
              <button type="submit" onClick={handleSubmit} className="button">
                Save Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Mini-map Section */}
        <div className="mini-map">
          <h2>Business Location</h2>
          <div className="map-box">
            {/* Mini-map or location content goes here */}
          </div>

          {/* Social Media Links Section */}
          <div className="social-links-wrapper">
            <h2>Social Media Links</h2>
            {socialLinks.map((link, index) => (
              <SocialMediaInput
                key={index}
                platform={link.platform}
                url={link.url}
                onUrlChange={(url) => handleSocialLinkChange(index, 'url', url)}
              />
            ))}
          </div>

          {/* Select Hours Button */}
          <div className="select-hours-container">
            <button onClick={toggleBusinessHours} className="button select-hours-button">
              Select Hours
            </button>
          </div>
        </div>
      </div>

      {/* Business Hours Modal */}
      {showBusinessHours && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Business Hours for {selectedMonth || 'Month'}</h3>
            <select onChange={handleMonthChange} value={selectedMonth} className="month-select">
              <option value="" disabled>Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <div className="hours-input-wrapper">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="day-input-wrapper">
                  <div className="day-label">
                    <label>{day}</label>
                  </div>
                  <div className="time-input-group">
                    <input
                      type="time"
                      value={businessHours[day]?.open || ''}
                      onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                      className="time-input"
                      placeholder="Open"
                    />
                    <span className="time-separator">to</span>
                    <input
                      type="time"
                      value={businessHours[day]?.close || ''}
                      onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                      className="time-input"
                      placeholder="Close"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save and Close Buttons */}
            <div className="modal-actions">
              <button onClick={handleSaveBusinessHours} className="button save-modal-button">
                Save
              </button>
              <button onClick={toggleBusinessHours} className="button close-modal-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
