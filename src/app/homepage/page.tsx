/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'; 

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import logoImage from '../../public/transparent_logo.png';
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
            <button type="submit" className="bg-teal-400 text-white p-2 rounded-r-md">
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

    const [selectedFilter, setSelectedFilter] = useState<string>('filter1');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

    const filterNames: Record<string, string> = {
        filter1: 'Barber',
        filter2: 'Tutor',
        filter3: 'Massage',
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(event.target.value);
    };

    const handleConfirmSelection = () => {
        setConfirmedSelection(true);
        console.log('Confirmed Filter:', filterNames[selectedFilter]);
        console.log('Confirmed Items:', selectedItems);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-100">
            {/* Logo */}
            <div className="bg-black fixed top-0 left-0 inline-flex">
                <Image src={logoImage} alt="Logo" width={64} height={30} /> {/* Smaller dimensions */}
            </div>

            {/* Header */}
            <header className="text-black py-8 text-center">
                <h1 className="text-5xl font-bold tracking-wide">Style</h1>
                <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
            </header>
            
            <Navbar />
            {/* Search Bar */}
            <SearchBar />

            {/* Filter Section */}
            <div className="filter fixed">
                <h2 className="text-2xl font-bold">Choose Your Options</h2>
                
                <div className="options-group">
                    <h3 className="text-xl font-bold">Select a Filter:</h3>
                    <label>
                        <input
                            type="radio"
                            value="filter1"
                            checked={selectedFilter === 'filter1'}
                            onChange={handleFilterChange}
                        />
                        Barber
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="filter2"
                            checked={selectedFilter === 'filter2'}
                            onChange={handleFilterChange}
                        />
                        Tutor
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="filter3"
                            checked={selectedFilter === 'filter3'}
                            onChange={handleFilterChange}
                        />
                        Massage
                    </label>
                </div>

                <div>
                    <h4 className="text-lg font-bold">Selected Filter: {filterNames[selectedFilter]}</h4>
                </div>

                <button 
                    onClick={handleConfirmSelection}
                    className="bg-teal-400 text-white px-4 py-2 rounded-md mt-4"
                >
                    Confirm Selection
                </button>

                {confirmedSelection && (
                    <p className="mt-2 text-green-600">Selection confirmed!</p>
                )}
            </div>

            {/* Redirect Button */}
            <div className="flex justify-center mt-6">
                <button 
                    onClick={handleRedirect} 
                    className="bg-teal-500 text-white px-4 py-2 rounded-md"
                >
                    Schedule An Appointment
                </button>
            </div>

            <div className="flex justify-center">
                <Image src={artistImage} alt="Artist" width={200} height={200} />
                <Image src={customerImage} alt="Customer" width={200} height={200} />
            </div>

            <div className="space-y-10 mt-10">
                <section className="bg-white py-8 px-4">
                    <h2 className="text-2xl font-bold text-left mb-4">New Businesses</h2>
                    <div className="flex overflow-x-auto space-x-4 px-4">
                    </div>
                </section>

                <section className="bg-white py-8 px-4">
                    <h2 className="text-2xl font-bold text-left mb-4">Recommended</h2>
                    <div className="flex overflow-x-auto space-x-4 px-4">
                    </div>
                </section>
            </div>
        </div>
    );
}
