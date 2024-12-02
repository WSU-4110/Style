'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filter.css';

// Define the interface for Category and Result types
interface Category {
    name: string;
    // Add other properties if needed
}

interface Result {
    name: string;
    // Add other properties if needed
}

const SearchBar: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchTerm);
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
    const [categories, setCategories] = useState<Category[]>([]); // Specify type
    const [searchResults, setSearchResults] = useState<Result[]>([]); // Specify type

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/category/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = async (term: string) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/search/?q=${term}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-100">
            {/* Logo */}
            <div className="bg-black fixed top-0 left-0 inline-flex">
                <Image src="/transparent_logo.png" alt="Logo" width={64} height={30} />
            </div>

            {/* Header/ Main Content Area */}
            <main className="flex-1 p-8 ml-64">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/transparent_logo.png" alt="Logo" width={65} height={65} />
                        <h1 className="text-5xl font-bold tracking-wide ml-4">Explore</h1>
                    </div>
                    <p className="mt-2 text-lg">Search Artists Here to Connect</p>
                </div>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                {/* Categories Section */}
                <h2 className="text-xl font-bold mt-8">Categories</h2>
                <ul className="list-disc ml-6">
                    {categories.map((category, index) => (
                        <li key={index}>{category.name}</li>
                    ))}
                </ul>

                {/* Search Results Section */}
                {searchResults.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mt-8">Search Results</h2>
                        <ul className="list-disc ml-6">
                            {searchResults.map((result, index) => (
                                <li key={index}>{result.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Images Section */}
                <div className="flex justify-center mt-6 space-x-4">
                    <Image src="/artist_barber.jpg" alt="Artist" width={200} height={200} />
                    <Image src="/customer.jpg" alt="Customer" width={200} height={200} />
                </div>
            </main>

            {/* Sidebar */}
            <aside className="sidebar w-64 bg-gray-100 p-4 fixed left-0 top-[60px] z-10 transition-all duration-300 ease-in-out hover:w-64">
                <nav>
                    <ul>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            <div className="logo-container">
                                <Image src="/nail_logo.png" alt="Nail Salon" width={40} height={40} />
                            </div>
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button onClick={() => router.push('/nailsalon')} className="text-lg hover:text-teal-400">
                                 Nail Salon
                                 </button>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            <div className="logo-container">
                                <Image src="/hair_logo.png" alt="Hair Stylists" width={40} height={40} />
                            </div>
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => router.push('/hair')} className="text-lg hover:text-teal-400">
                                 Hair Stylists
                                 </button>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            <div className="logo-container">
                                <Image src="/tattoo_logo.png" alt="Tattoo Artist" width={40} height={40} />
                            </div>
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => router.push('/tattoo')} className="text-lg hover:text-teal-400">
                                 Tattoo Artists
                                 </button>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            <div className="logo-container">
                                <Image src="/barber_logo.png" alt="Barber Shops" width={40} height={40} />
                            </div>
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => router.push('/barber')} className="text-lg hover:text-teal-400">
                                 Barber Shops
                                 </button>
                            </div>
                        </li>
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            <div className="logo-container">
                                <Image src="/new_logo.png" alt="Under 6 Months" width={40} height={40} />
                            </div>
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/under6months" className="text-lg hover:text-teal-400">Under 6 Months</a>
                            </div>
                        </li>
                        {/* Favorites Section */}
                        <li className="sidebar-item mb-4 flex flex-col items-center group">
                            {/* Logo for Favorites */}
                            <div className="logo-container">
                                <Image src="/heart_logo.png" alt="Favorites" width={40} height={40} />
                            </div>
                            {/* Text for Favorites, hidden by default */}
                            <div className="text-container mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="/favorites" className="text-lg hover:text-teal-400">Favorites</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
