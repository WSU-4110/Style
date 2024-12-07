'use client';
import React from 'react';
import Card from '../components/ui/card';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function TattooPage() {
  const router = useRouter();

  const mockBusinesses = [ // mock business for css designing
    {
      businessName: 'Ink Masters Tattoo Studio',
      address: '19007 Leaf Road, Orlando, FL',
      images: ['https://s8tattoo.com/cdn/shop/articles/Untitled_1200x.png?v=1629124929'],
      about: 'A premier tattoo studio known for its custom designs and expert artists.',
      services: ['Custom Tattoos', 'Piercings', 'Tattoo Touch-ups'],
      socialLinks: ['https://instagram.com/inkmasterstudio'],
    },
    {
      businessName: 'Iconic Tattoo',
      address: '38019 Park Blvd, Oakman, MI',
      images: ['https://media.timeout.com/images/105165480/750/562/image.jpg'],
      about: 'Tattoo artistry starts here.',
      services: ['Tattoo', 'Piercings'],
      socialLinks: ['https://instagram.com/iconictattoo'],
    }
  ];

  const handleBookClick = (businessName: string) => {
    router.push('schedule');
  };

  return (
    <div className="container">
      <div className="flex">
        {/* Sidebar - imported component */}
        <Sidebar />

        {/* Main Content */}
        <main className="ml-64 w-full p-8">
          <h1 className="title">Tattoo Artists</h1>
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
