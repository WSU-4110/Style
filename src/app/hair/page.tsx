'use client';
import React from 'react';
import '../categories.css';
import Card from '../components/ui/card';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navigationbar';

export default function HairStylists() {
  //const businesses: any[] = [];
  const router = useRouter();
  const mockBusinesses = [ // mock business for css designing
    {
      businessName: 'Hairloft Salon',
      address: '8192 Oakman St, Alemond, MI',
      images: ['https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg'],
      about: 'A modern hair salon specializing in creating stunning hairstyles for every occasion. Whether you are looking for a fresh cut, a bold new color, or expert styling for a special event, Hairloft Salon offers personalized services to bring out your best look.',
      services: ['Haircuts', 'Hair Treatments', 'Hair Coloring', 'Styling'],
      socialLinks: ['https://instagram.com/hairloftsalon']
    }
  ];

  const handleBookClick = (businessName: string) => {
    router.push(`schedule`);
  };

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Hair Stylists</h1>
      <div className="list">
        {mockBusinesses.length > 0 ? (
          mockBusinesses.map((business, index) => (
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
    </div>
  );
}