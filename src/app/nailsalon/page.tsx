'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '../categories.css';
import Card from '../components/ui/card';

export default function NailSalonPage() {
  const router = useRouter();
  const mockBusinesses = [ // mock business for css designing
    {
      businessName: 'Nail Palace',
      address: '829 Maple St, Kansas City, KS',
      images: ['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg'],
      about: 'A relaxing nail salon offering the best manicures and pedicures.',
      services: ['Manicure', 'Pedicure', 'Nail Art'],
      socialLinks: ['https://instagram.com/nailpalace']
    }
  ];
  //const businesses: any[] = [];

  const handleBookClick = (businessName: string) => {
    router.push(`schedule`);
  };

  return (
    <div className="container">
      <h1 className="title">Nail Salons</h1>
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