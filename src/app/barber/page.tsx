'use client';

import React from 'react';
import '../categories.css';
import Card from '../components/ui/card';
import Sidebar from '../components/Sidebar'; 
import { useRouter } from 'next/navigation';

export default function BarberShops() {
  const router = useRouter();
  const businesses: any[] = [];

  const handleBookClick = (businessName: string) => {
    router.push('schedule');
  };


  return (
    <div className="container">
      <div className="flex">
        <Sidebar /> 

        <main className="ml-64 w-full p-8">
          <h1 className="title">Barber Shops</h1>
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
                  onBookClick={handleBookClick}
                />
              ))
            ) : (
              <p>No businesses available. Please check back later!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
