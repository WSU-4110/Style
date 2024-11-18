'use client';
import React from 'react';
import '../categories.css';
import Card from '../components/ui/card';

export default function NailSalonPage() {
  // mock business for css designing
  //const mockBusinesses = [
  //  {
  //    businessName: 'Nail Palace',
  //    address: '829 Maple St, Kansas City',
  //    images: ['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg'],
  //    about: 'A relaxing nail salon offering the best manicures and pedicures.',
  //    services: ['Manicure', 'Pedicure', 'Nail Art'],
  //    socialLinks: ['https://instagram.com/nailpalace']
  //  }
  //];
  const businesses: any[] = [];

  return (
    <div className="container">
      <h1 className="title">Nail Salons</h1>
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