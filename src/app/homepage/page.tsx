/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'; 

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import Navbar from '../components/navigationbar';
import Image from 'next/image';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
        // Handle search logic here (e.g., filtering data)
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
        <div className="min-h-screen flex flex-col bg-white-100">
            {/* Header */}
            <header className="text-black py-8 text-center">
                <h1 className="text-5xl font-bold tracking-wide">Style</h1>
                <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
            </header>
            
            <Navbar />
            {/* Search Bar */}
            <SearchBar />


            {/* Redirect Button */}
            <div className="flex justify-center mt-6">
                <button 
                    onClick={handleRedirect} 
                    className="bg-teal-400 text-white px-4 py-2 rounded-md"
                >
                    Schedule An Appoinment
                </button>
            </div>

            {/* Images or other content can go here */}
            <div className="flex justify-center">
                <Image src={artistImage} alt="Artist" width={200} height={200} />
                <Image src={customerImage} alt="Customer" width={200} height={200} />
            </div>
        </div>
    );
}
