'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import heartLogo from '../../public/heart_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-0 left-0 h-full bg-black text-white flex items-center justify-center transform duration-300 ${
          isSidebarOpen ? "w-[70px]" : "w-[30px]"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="text-sm font-bold rotate-90 transform">
          {isSidebarOpen ? "Close Menu" : "☰"}
        </span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-black text-white shadow-lg transform duration-300 ${
          isSidebarOpen ? "translate-x-[30px] w-[120px]" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col justify-evenly h-full p-3">
          <ul className="space-y-8">
            <li className="flex flex-col items-center gap-2 group">
              <Image src={nailSalonLogo} alt="Nail Salon" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/nailsalon")}
              >
                Nail Salon
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group">
              <Image src={hairLogo} alt="Hair Stylists" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/hair")}
              >
                Hair Stylists
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group">
              <Image src={tattooLogo} alt="Tattoo Artist" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/tattoo")}
              >
                Tattoo Artists
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group">
              <Image src={barberLogo} alt="Barber Shops" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/barber")}
              >
                Barber Shops
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group">
              <Image src={newLogo} alt="Under 6 Months" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/newthings")}
              >
                Under 6 Months
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group">
              <Image src={heartLogo} alt="Favorites" className="w-10 h-10" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/favorites")}
              >
                Favorites
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
