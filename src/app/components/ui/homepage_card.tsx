'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './homepage_card.css';

interface CardProps {
  businessName: string;
  address: string;
  images: string[];
  about: string;
  services: string[];
  route?: string; 
  onBookClick: (businessName: string) => void;
}

const Homepage_Card: React.FC<CardProps> = ({
  businessName,
  address,
  images,
  about,
  services,
  route,
  onBookClick,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (route) router.push(route);
  };

  const handleBookClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    onBookClick(businessName);
  };

  return (
      <div className="card" onClick={handleCardClick}>
        <div className="imagePlaceholder">
          {images.length > 0 && (
            <img 
            src={images[0]} 
            alt={`${businessName} preview`} 
            className="card-image" 
          />
        )}
        </div>
        <div className="info">
          <h2 className="businessName">{businessName}</h2>
          <p className="address">{address}</p>
          <p className="about">{about}</p>
        <h3>Services</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      <button 
        className="button book-button" 
        onClick={handleBookClick}
      >
        Book
      </button>
    </div>
  );
};

export default Homepage_Card;