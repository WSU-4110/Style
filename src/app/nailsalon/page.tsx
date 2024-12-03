'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../categories.css';
import Card from '../components/ui/card';

// Import your logo images here (these are example imports, adjust based on your actual imports)
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';
import heartLogo from '../../public/heart_logo.png';

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

  // const businesses: any[] = [];

  const handleBookClick = (businessName: string) => {
    router.push('schedule');
  };

  return (
    <div className="container">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sidebar w-64 bg-gray-100 p-4 fixed left-0 top-[60px] z-10 transition-all duration-300 ease-in-out hover:w-64">
          <nav>
            <ul>
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={nailSalonLogo} alt="Nail Salon" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/nailsalon')} className="text-lg hover:text-teal-400">
                    Nail Salon
                  </button>
                </div>
              </li>
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={hairLogo} alt="Hair Stylists" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/hair')} className="text-lg hover:text-teal-400">
                    Hair Stylists
                  </button>
                </div>
              </li>
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={tattooLogo} alt="Tattoo Artist" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/tattoo')} className="text-lg hover:text-teal-400">
                    Tattoo Artists
                  </button>
                </div>
              </li>
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={barberLogo} alt="Barber Shops" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/barber')} className="text-lg hover:text-teal-400">
                    Barber Shops
                  </button>
                </div>
              </li>
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={newLogo} alt="Under 6 Months" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/newthings')} className="text-lg hover:text-teal-400">
                    Under 6 Months
                  </button>
                </div>
              </li>
              {/* Favorites Section */}
              <li className="sidebar-item mb-4 flex flex-col items-center group">
                <div className="logo-container">
                  <Image src={heartLogo} alt="Favorites" width={40} height={40} />
                </div>
                <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => router.push('/favorites')} className="text-lg hover:text-teal-400">
                    Favorites
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 w-full p-8">
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
        </main>
      </div>
    </div>
  );
}
