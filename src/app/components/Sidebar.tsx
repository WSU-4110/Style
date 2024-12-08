'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import nailSalonLogo from '../../public/new_nailsalon.png';
import hairLogo from '../../public/new_hair_salon.png';
import heartLogo from '../../public/new_heartlogo.png';
import tattooLogo from '../../public/new_tattoo.png';
import barberLogo from '../../public/new_barber.png';
import newLogo from '../../public/new_6monthslogo.png';

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
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={nailSalonLogo} alt="Nail Salon" className="w-8 h-8" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/nailsalon")}
              >
                Nail Salon
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={hairLogo} alt="Hair Stylists" className="w-8 h-8" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/hair")}
              >
                Hair Stylists
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={tattooLogo} alt="Tattoo Artist" className="w-8 h-8" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/tattoo")}
              >
                Tattoo Artists
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={barberLogo} alt="Barber Shops" className="w-7 h-8" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/barber")}
              >
                Barber Shops
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={newLogo} alt="Under 6 Months" className="w-8 h-8" />
              <button
                className="text-white text-sm group-hover:text-teal-400"
                onClick={() => router.push("/newthings")}
              >
                Under 6 Months
              </button>
            </li>
            <li className="flex flex-col items-center gap-2 group font-sans">
              <Image src={heartLogo} alt="Favorites" className="w-10 h-9" />
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
