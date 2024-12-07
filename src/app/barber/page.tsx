'use client';

import React from 'react';
import Card from '../components/ui/card';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/navigation';

export default function BarberShops() {
  const router = useRouter();

  const mockBusinesses = [
    {
      businessName: "Dave's Barbershop",
      address: '2391 Sunset Ln, Grove, MI',
      images: [
        'https://barbercraftsd.com/wp-content/uploads/2022/09/pexels-photo-7697401-1-scaled.jpg',
      ],
      about:
        'A barbershop with a classic touch, offering precision haircuts, beard trims, and grooming services tailored to you. Relax in a welcoming space where style meets tradition.',
      services: ['Haircuts', 'Fade', 'Hair Coloring'],
      socialLinks: ['https://instagram.com/davesbarbershop'],
    },
  ];

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
        </main>
      </div>
    </div>
  );
}
