// card
'use client';

import React from 'react';

interface CardProps {
  businessName: string;
  address: string;
  images: string[];
  about: string;
  services: string[];
  socialLinks?: string[];
  onBookClick: (businessName: string) => void;
}

const Card: React.FC<CardProps> = ({
  businessName,
  address,
  images,
  about,
  services,
  socialLinks,
  onBookClick,
}) => {
  const handleClick = () => {
    if (onBookClick) {
      onBookClick(businessName);
    }
  };
  const imageAltText = `${businessName} image`;
  
  return (
    <div className="card">
      <div className="info">
        <div className="imagePlaceholder">
          {images.length > 0 && (
            <img src={images[0]} alt={imageAltText} className="image" />
          )}
        </div>
        <div>
          <h2 className="businessName">{businessName}</h2>
          <p className="address">{address}</p>
          <p className="about">{about}</p>
          <h3>Services:</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h3>Social Media Links:</h3>
              <ul>
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button className="button" onClick={handleClick}>Book</button>
    </div>
  );
};

export default Card; 