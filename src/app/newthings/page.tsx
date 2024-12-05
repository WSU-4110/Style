'use client';
import React from 'react';
import '../categories.css';
import Card from '../components/ui/card';
import { useRouter } from 'next/navigation';
import '../homepage/filter.css';
import Sidebar from '../components/Sidebar';

export default function NewThingsPage() {
  const router = useRouter();

  const mockBusinesses = [ // mock business for css designing
    {
      businessName: 'Nail Palace',
      address: '829 Maple St, Kansas City, KS',
      images: ['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg'],
      about: 'A relaxing nail salon offering the best manicures and pedicures.',
      services: ['Manicure', 'Pedicure', 'Nail Art'],
      socialLinks: ['https://instagram.com/nailpalace'],
    },
    {
      businessName: 'Ink Masters Tattoo Studio',
      address: '19007 Maple, Charles, KS',
      images: ['https://example.com/e-bike-image.jpg'],
      about: 'A premier tattoo studio known for its custom designs and expert artists.',
      services: ['Custom Tattoos', 'Piercings', 'Tattoo Touch-ups'],
      socialLinks: ['https://instagram.com/inkmasterstudio'],
    },
  ];

  const handleBookClick = (businessName: string) => {
    router.push('book');
  };

  return (
    <div className="container">
      <div className="flex">
        <Sidebar />
        <main className="ml-64 w-full p-8">
          <h1 className="title">New Businesses</h1>
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
