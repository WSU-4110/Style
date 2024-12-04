'use client';
// Sidebar.tsx
import React, { useState } from 'react';
import Image from 'next/image';  // Assuming you're using Next.js
import { useRouter } from 'next/navigation';
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import heartLogo from '../../public/heart_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';
//import './filter.css';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        className="fixed top-[60px] left-0 w-8 h-12 bg-teal-500 text-white rounded-r-lg flex items-center justify-center z-50 hover:bg-teal-400 transition-transform duration-300"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        ≡
      </button>

      <aside
        className={`sidebar ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} w-70 bg-gray-100 p-10 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out`}
        onMouseEnter={() => setIsSidebarVisible(true)}
        onMouseLeave={() => setIsSidebarVisible(false)}
      >
        <nav>
          <ul>
            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={nailSalonLogo} alt="Nail Salon" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/nailsalon")} className="text-lg hover:text-teal-400">
                  Nail Salon
                </button>
              </div>
            </li>

            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={hairLogo} alt="Hair Stylists" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/hair")} className="text-lg hover:text-teal-400">
                  Hair Stylists
                </button>
              </div>
            </li>

            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={tattooLogo} alt="Tattoo Artist" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/tattoo")} className="text-lg hover:text-teal-400">
                  Tattoo Artists
                </button>
              </div>
            </li>

            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={barberLogo} alt="Barber Shops" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/barber")} className="text-lg hover:text-teal-400">
                  Barber Shops
                </button>
              </div>
            </li>

            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={newLogo} alt="Under 6 Months" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/under6months")} className="text-lg hover:text-teal-400">
                  Under 6 Months
                </button>
              </div>
            </li>

            <li className="sidebar-item mb-4 flex flex-col items-center group">
              <div className="logo-container">
                <Image src={heartLogo} alt="Favorites" width={40} height={40} />
              </div>
              <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => router.push("/favorites")} className="text-lg hover:text-teal-400">
                  Favorites
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
