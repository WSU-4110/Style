'use client';

import { useRouter } from 'next/navigation';
import nailSalonLogo from '../../public/nail_logo.png';
import hairLogo from '../../public/hair_logo.png';
import heartLogo from '../../public/heart_logo.png';
import tattooLogo from '../../public/tattoo_logo.png';
import barberLogo from '../../public/barber_logo.png';
import newLogo from '../../public/new_logo.png';
import Image from 'next/image';
import background from '../../public/homepage_bg.png';
import React, { useState, useEffect } from 'react';
import Homepage_Card from '../components/ui/homepage_card';
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
                  <button onClick={() => router.push("/newthings")} className="text-lg hover:text-teal-400">
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
          <div className="inset-0 flex flex-col justify-center items-center text-white bg-black/20 py-30">
            <h1 className="text-5xl mt-28 font-bold tracking-wide">Explore</h1>
            <p className="mt-2 text-lg typing-effect">Search Artists Here to Connect...</p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
    
        <div className= "relative w-full bg-white p-8 shadow-lg -mt-2">
          <div className="max-w-screen-xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-2 text-left">New Businesses</h2>
            <p className="text-lg text-left mb-8">Explore upcoming businesses</p>
            <div className="flex flex-wrap gap-6 justify-center">
      <div className="list">
      <Homepage_Card
      businessName="Nail Palace"
      address="829 Maple St, Kansas City, KS"
      images={['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg']}
      about="A relaxing nail salon."
      services={["Manicure", "Pedicure", "Nail Art"]}
      onBookClick={(name) => alert(`Booking ${name}`)}
    />

    <Homepage_Card
      businessName="Hairloft Salon"
      address="8192 Oakman St, Alemond, MI"
      images={["https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg"]}
      about="A modern hair salon."
      services={["Haircuts", "Hair Treatments", "Hair Coloring", "Styling"]}
      onBookClick={(name) => alert(`Booking ${name}`)}
    />

    <Homepage_Card
      businessName="Iconic Tattoo"
      address="38019 Park Blvd"
      images={["https://media.timeout.com/images/105165480/750/562/image.jpg"]}
      about="Tattoo artistry starts here."
      services={["Tattoo", "Piercings"]}
      onBookClick={(name) => alert(`Booking ${name}`)}
    />



    <Homepage_Card
      businessName="Daves Barber Shop"
      address="2391 Sunset Ln"
      images={["https://detroitbarbers.com/cdn/shop/t/4/assets/db-barbershop-page-corktown-gallery-a.jpg?v=2985141150787217361509093960"]}
      about="Straight shaves, straight styles."
      services={["Haircuts", "Fade", "Colorings"]}
      onBookClick={(name) => alert(`Booking ${name}`)}
/>
      </div>
         </div>
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