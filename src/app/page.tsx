'use client'; 

import { useRouter } from 'next/navigation';
import artistImage from '../public/artist_barber.jpg';
import customerImage from '../public/customer.jpg';

export default function Home() {
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
      <header className="bg-white-400 text-orange p-8 w-full text-center">
        <h1 className="text-4xl font-bold">Welcome to Style</h1>
        <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
      </header>

      {/* Main Split Section */}
      <main className="flex flex-1 flex-col md:flex-row justify-center items-center text-center p-6 md:p-12">
        {/* Artist Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 m-4 w-full md:w-1/2 transition-transform hover:scale-105 cursor-pointer" onClick={handleLoginClick}>
          {/* Artist Image */}
          <img
            src={artistImage.src} // Using the imported image
            alt="Artists"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl font-semibold text-teal-500">For Artists</h2>
          <p className="mt-4 text-gray-700">Sign up and create your business profile to manage appointments, showcase your work, and reach new customers.</p>
          <button className="mt-6 bg-teal-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-500">
            Create Business Account
          </button>
        </div>

        {/* Customer Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 m-4 w-full md:w-1/2 transition-transform hover:scale-105 cursor-pointer" onClick={handleCustomerClick}>
          {/* Customer Image */}
          <img
            src={customerImage.src} // Using the imported image
            alt="Customers"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl font-semibold text-pink-500">For Customers</h2>
          <p className="mt-4 text-gray-700">Discover top-rated artists in your area and book services directly from their profiles.</p>
          <button className="mt-6 bg-pink-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-pink-500">
            Find Services
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-600 text-white py-8 text-center w-full">
        <p>&copy; 2024 Style. All rights reserved.</p>
      </footer>
    </div>
  );
}