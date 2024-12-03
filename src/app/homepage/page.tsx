'use client';

import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import heartLogo from '../../public/heart_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';
import Image from 'next/image';
import background from '../../public/homepage_bg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filter.css';

// Define the interface for Category and Result types
interface Category {
    name: string;
}

interface Result {
    name: string;
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
          className="p-2 text-black rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white p-2 rounded-r-md hover:bg-teal-600 transition duration-200 ease-in-out"
        >
          Search
        </button>
      </form>
    );
};

  
  const Sidebar: React.FC = () => {
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
    return (
      <>
        <button
          className="fixed top-[60px] left-0 w-8 h-12 bg-teal-500 text-white rounded-r-lg flex items-center justify-center z-50 hover:bg-teal-400 transition-transform duration-300"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          
        >
          ≡
        </button>
  
        <aside
          className={`sidebar ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } w-70 bg-gray-100 p-10 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out`}
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
  
  export default function Home() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchResults, setSearchResults] = useState<Result[]>([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/category/categories/");
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }, []);
  
    const handleSearch = async (term: string) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/search/search/?q=${term}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    return (
      <div className="relative w-full">
        <div className=" w-full h-[40vh] bg-cover bg-center"
             style={{
               backgroundImage: `url(${background.src})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
             }}>
          {/* Overlay */}
          <div className=" inset-0 flex flex-col justify-center items-center text-white bg-black/50">
            <h1 className="text-5xl mt-28 font-bold tracking-wide">Explore</h1>
            <p className="mt-2 text-lg typing-effect">Search Artists Here to Connect</p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
    
        
        <div className= "relative w-full bg-white p-8 shadow-lg -mt-2">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">New Businesses</h2>
            <p className="text-lg">Explore upcoming businesses</p>
          </div>
        </div>
  
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
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
        </main>
      </div>
    );
    
  }