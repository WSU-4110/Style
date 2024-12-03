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

export default function HairStylists() {
  const router = useRouter();

  const mockBusinesses = [ // mock business for css designing
    {
      businessName: 'Hairloft Salon',
      address: '8192 Oakman St, Alemond, MI',
      images: ['https://www.google.com/imgres?q=tattoo%20artist&imgurl=https%3A%2F%2Fcdn.shoutoutmiami.com%2Fwp-content%2Fuploads%2F2021%2F08%2Fc-PersonalAdrianSparkman__1_1627150587391.jpg&imgrefurl=https%3A%2F%2Fshoutoutmiami.com%2Fmeet-adrian-sparkman-tattoo-artist%2F&docid=Kah8DKSnYeaR5M&tbnid=XB54EMZ14x0AZM&vet=12ahUKEwikq5jG0IyKAxWEmIkEHevpHjEQM3oECFIQAA..i&w=1000&h=1145&hcb=2&ved=2ahUKEwikq5jG0IyKAxWEmIkEHevpHjEQM3oECFIQAA'],
      images: ['https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg'],
      about: 'A modern hair salon specializing in creating stunning hairstyles for every occasion. Whether you are looking for a fresh cut, a bold new color, or expert styling for a special event, Hairloft Salon offers personalized services to bring out your best look.',
      services: ['Haircuts', 'Hair Treatments', 'Hair Coloring', 'Styling'],
      socialLinks: ['https://instagram.com/hairloftsalon']
    }
  ];

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
        </main>
      </div>
    </div>
  );
}
