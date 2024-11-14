/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import logoImage from '../../public/logo.jpg'; // Importing the logo image
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
            <main className="flex-1 p-8">
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
            <aside className="sidebar w-64 bg-gray-100 p-4 absolute left-0 top-[120px]">
                <nav>
                    <ul>
                        <li className="mb-4">
                            <div className="sidebar-item p-4 rounded-md">
                                <a href="/" className="text-lg hover:text-teal-400">Barber</a>
                            </div>
                        </li>
                        <li className="mb-4">
                            <div className="sidebar-item p-4 rounded-md">
                                <a href="/services" className="text-lg hover:text-teal-400">Tutor</a>
                            </div>
                        </li>
                        <li className="mb-4">
                            <div className="sidebar-item p-4 rounded-md">
                                <a href="/about" className="text-lg hover:text-teal-400">Doctor</a>
                            </div>
                        </li>
                        <li className="mb-4">
                            <div className="sidebar-item p-4 rounded-md">
                                <a href="/contact" className="text-lg hover:text-teal-400">Counselor</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
