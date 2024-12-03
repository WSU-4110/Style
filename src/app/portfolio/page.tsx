'use client';

import './portfolio.css';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Navbar from '../components/navigationbar';
import { storage } from '../../firebase-config'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import SocialMediaInput from '../components/socialmediainput'; // Default import (no curly braces)


export default function Portfolio() {
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
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


  //----------------------------- Photo Upload Section ----------------------------------------------------------

  // Handle profile picture upload
  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfilePicture(file);

      // Upload to Firebase
      const url = await uploadToFirebase(file, 'profile_pictures');
      setProfilePictureUrl(url);
    }
  };
  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  // Handle carousel photos upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPhotos(files);

      // Upload each photo to Firebase
      const urls = await Promise.all(files.map((file) => uploadToFirebase(file, 'carousel_photos')));
      setPhotoUrls(urls);
      setCurrentPhotoIndex(0);
    }
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };


   // Function to upload file to Firebase Storage
   const uploadToFirebase = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };


  // Service Functions
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


  // ------------------------------------------------------ Social Links ------------------------------------------------------
  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setSocialLinks(updatedLinks);
  };
  // ------------------------------------------------------------------------------------------------------------

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      business_name: businessName,
      bio,
      profile_picture: profilePictureUrl,
      photos: photoUrls,
      services,
      social_links: socialLinks
    };

    try {
      const response = await fetch('http://localhost:8000/api/artist-portfolio/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Portfolio saved successfully!');
        router.push('/appointments');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Failed to save portfolio'}`);
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio. Please try again.');
    }
  };


  // ------------------------------------------------------ Business Hour ------------------------------------------------------

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




  // ------------------------------------------------------ HMTL SECTION ------------------------------------------------------
  return (
    <div className="container">
      <Navbar />

      {/* Business Name */}
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
          <div className="profile-picture-upload group" onClick={triggerProfileUpload}>
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
            />
            <div className="relative w-full h-full">
              {profilePictureUrl  ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={profilePictureUrl}
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

          {/* Carousel Photo Upload */}
          <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-[500px] w-[900px] overflow-hidden rounded-lg group">
              {photoUrls.length > 0 ? (
                <div className="duration-700 ease-in-out">
                  <img
                    src={photoUrls[currentPhotoIndex]}
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

            {/* Carousel Controls */}
            
            {/* Carousel Previous Photo */}
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

            {/* Carousel Next Photo */}
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

          {/* Information Section */}
          <div className="description-wrapper">
            <h2>More Information</h2>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="List information about booking Here. For instance the address or any heads that a customer might need for parking."
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.9842084360585!2d-83.18184352326212!3d42.32153557119643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b349109787615%3A0x5d1bcd26a0b4d1aa!2s4710%20Horger%20St%2C%20Dearborn%2C%20MI%2048126!5e0!3m2!1sen!2sus!4v1731987936453!5m2!1sen!2sus"
              width="380"
              height="350"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
