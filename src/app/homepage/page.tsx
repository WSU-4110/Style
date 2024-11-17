/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import logoImage from '../../public/logo.jpg'; // Importing the logo image
import nailSalonLogo from '../../public/nail_logo.png'; // Replace with actual logo
import hairLogo from '../../public/hair_logo.png'; // Replace with actual logo
import tattooLogo from '../../public/tattoo_logo.png'; // Replace with actual logo
import barberLogo from '../../public/barber_logo.png'; // Replace with actual logo
import newLogo from '../../public/new_logo.png'; // Replace with actual logo
import Navbar from '../components/navigationbar';
import Image from 'next/image';
import React, { useState } from 'react';
import './filter.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex justify-center my-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-l-md"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
                Search
            </button>
        </form>
    );
};

export default function Home() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('schedule');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 p-8 ml-64">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <div className="flex items-center justify-center">
                        <Image src={logoImage} alt="Logo" width={65} height={65} />
                        <h1 className="text-5xl font-bold tracking-wide ml-4">Style</h1>
                    </div>
                    <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
                </div>

                {/* Search Bar */}
                <SearchBar />

                {/* Redirect Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleRedirect}
                        className="bg-teal-400 text-white px-4 py-2 rounded-md"
                    >
                        Schedule An Appointment
                    </button>
                </div>

                {/* Images Section */}
                <div className="flex justify-center mt-6 space-x-4">
                    <Image src={artistImage} alt="Artist" width={200} height={200} />
                    <Image src={customerImage} alt="Customer" width={200} height={200} />
                </div>
            </main>

            {/* Sidebar */}
            <aside className="sidebar w-64 bg-gray-100 p-4 fixed left-0 top-[60px] z-10 transition-all duration-300 ease-in-out hover:w-64">
                <nav>
                    <ul>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Nail Salon */}
                            <div className="logo-container">
                                <Image src={nailSalonLogo} alt="Nail Salon" width={40} height={40} />
                            </div>
                            {/* Text for Nail Salon, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/nailsalon" className="text-lg hover:text-teal-400">Nail Salon</a>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Hair Stylists */}
                            <div className="logo-container">
                                <Image src={hairLogo} alt="Hair Stylists" width={40} height={40} />
                            </div>
                            {/* Text for Hair Stylists, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/hair" className="text-lg hover:text-teal-400">Hair Stylists</a>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Tattoo Artists */}
                            <div className="logo-container">
                                <Image src={tattooLogo} alt="Tattoo Artist" width={40} height={40} />
                            </div>
                            {/* Text for Tattoo Artist, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/tattoo" className="text-lg hover:text-teal-400">Tattoo Artist</a>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Barber Shops */}
                            <div className="logo-container">
                                <Image src={barberLogo} alt="Barber Shops" width={40} height={40} />
                            </div>
                            {/* Text for Barber Shops, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/barber" className="text-lg hover:text-teal-400">Barber Shops</a>
                            </div>
                        </li>
                        {/* New Section: Under 6 Months */}
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Under 6 Months */}
                            <div className="logo-container">
                                <Image src={newLogo} alt="Under 6 Months" width={40} height={40} />
                            </div>
                            {/* Text for Under 6 Months, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/under6months" className="text-lg hover:text-teal-400">Under 6 Months</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
