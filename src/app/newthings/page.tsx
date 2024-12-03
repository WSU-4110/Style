'use client';

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import logoImage from '../../public/transparent_logo.png';
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import heartLogo from '../../public/heart_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filter.css';

interface Under6MonthsItem {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export default function Under6Months() {
  const router = useRouter();
  const [items, setItems] = useState<Under6MonthsItem[]>([]);

  useEffect(() => {
    const fetchUnder6MonthsItems = async () => {
      try {
        // Assume we're fetching the list of items under 6 months from an API
        const response = await axios.get('http://127.0.0.1:8000/api/under6months/');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items under 6 months:', error);
      }
    };

    fetchUnder6MonthsItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white-100">
      {/* Logo */}
      <div className="bg-black fixed top-0 left-0 inline-flex">
        <Image src={logoImage} alt="Logo" width={64} height={30} />
      </div>

      {/* Header/ Main Content Area */}
      <main className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="flex items-center justify-center">
            <Image src={logoImage} alt="Logo" width={65} height={65} />
            <h1 className="text-5xl font-bold tracking-wide ml-4">Under 6 Months</h1>
          </div>
          <p className="mt-2 text-lg">Discover services or artists that have been available for under 6 months.</p>
        </div>

        {/* List of Items */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-md">
                <Image src={item.imageUrl} alt={item.name} width={200} height={200} className="rounded-md" />
                <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-xl">No items under 6 months available at the moment.</p>
        )}
      </main>

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
                            <button onClick={() => router.push('/under6months')} className="text-lg hover:text-teal-400">
                                 Under 6 Months
                                 </button>
                            </div>
                        </li>
                        {/* Favorites Section */}
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Favorites */}
                            <div className="logo-container">
                                <Image src={heartLogo} alt="Favorites" width={40} height={40} />
                            </div>
                            {/* Text for Favorites, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => router.push('/favorites')} className="text-lg hover:text-teal-400">
                                 Favorites
                                 </button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
    </div>
  );
}
