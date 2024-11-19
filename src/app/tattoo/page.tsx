'use client';
import React from 'react';
import '../categories.css';
import Card from '../components/ui/card';

export default function TattooPage() {
  const businesses: any[] = [];

  return (
    <div className="container">
      <h1 className="title">Tattoo Artists</h1>
      <div className="list">
        {businesses.length > 0 ? (
          businesses.map((business, index) => (
            <Card
              key={index}
              businessName={business.businessName}
              address={business.address}
              images={business.images}
              about={business.about}
              services={business.services}
              socialLinks={business.socialLinks}
            />
          ))
        ) : (
          <p>No businesses available. Please check back later!</p>
        )}
      </div>
    </div>
  );
}