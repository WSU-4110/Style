/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import artistImage from '/artist_barber.jpg';
import customerImage from '/customer.jpg';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/artistlogin');
  };

  const handleCustomerClick = () => {
    router.push('/customerlogin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white-100">
      {/* Header */}
      <header className="text-black py-8 text-center">
          <h1 className="text-5xl font-bold tracking-wide">Style</h1>
          <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
      </header>

      {/* Main Split Section */}
      <main className="flex flex-1 flex-col md:flex-row justify-center items-center text-center p-6 md:p-12">
        
        {/* Artist Section */}
        <div
          className="bg-white shadow-lg rounded-lg p-8 m-4 w-full md:w-1/2 transition-transform hover:scale-105 cursor-pointer"
          onClick={handleLoginClick}
        >
          <div className="relative w-full h-[400px] overflow-hidden rounded-md mb-4">
            <Image
              src={artistImage}
              alt="Artists"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <h2 className="text-3xl font-semibold text-teal-500">For Artists</h2>
          <p>
            <span style={{ color: 'rgb(11, 163, 173)' }}>Manage</span> your time, money, and clients.
          </p>
          <button className="mt-6 bg-teal-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-500">
            Business Portal
          </button>
        </div>

        {/* Customer Section */}
        <div
          className="bg-black shadow-lg rounded-lg p-8 m-4 w-full md:w-1/2 transition-transform hover:scale-105 cursor-pointer"
          onClick={handleCustomerClick}
        >
          <div className="relative w-full h-[400px] overflow-hidden rounded-md mb-4">
            <Image
              src={customerImage}
              alt="Customers"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <h2 className="text-3xl font-semibold text-[#f4d9a0]">For Customers</h2>
          <p style={{ color: 'white' }}>
            <span style={{ color: 'rgb(244, 217, 160)' }}>Explore</span> the finest salons near you.
          </p>
          <button className="mt-6 bg-[#f4d9a0] text-black py-2 px-6 rounded-lg shadow-md hover:bg-[#e7c68e]">
            Explore Services
          </button>
        </div>
      </main>
    </div>
  );
}