'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage_Card from '../components/ui/homepage_card';
import Sidebar from '../components/Sidebar';
import './filter.css';
//import './typingEffect.css'; // For typing effect
import background from '../../public/homepage_bg.png';

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
    <form onSubmit={handleSearchSubmit} className="flex justify-center mt-4 mb-8">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-3 text-black rounded-l-md shadow focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
      />
      <button
        type="submit"
        className="bg-teal-500 text-white p-3 rounded-r-md hover:bg-teal-600 transition"
      >
        Search
      </button>
    </form>
  );
};

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResults, setSearchResults] = useState<Result[]>([]);

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
    <div className="relative w-full">
      {/* Full-Width Background Section with Shadow */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-wide text-white">Explore</h1>
          <p className="mt-2 text-lg typing-effect">Search Artists Here to Connect...</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Category Section */}
      <div
        className="relative w-full bg-white py-8 border border-black rounded-lg shadow-lg"
        style={{ marginTop: '-50px' }} // Moves the container up to hide the border
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recommended</h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore businesses we've tailored for your interests.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Homepage_Card
              businessName="Nail Palace"
              address="829 Maple St, Kansas City, KS"
              images={['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg']}
              about="A relaxing nail salon."
              services={['Manicure', 'Pedicure', 'Nail Art']}
              onBookClick={(name) => alert(`Booking ${name}`)}
            />

            <Homepage_Card
              businessName="Hairloft Salon"
              address="8192 Oakman St, Alemond, MI"
              images={['https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg']}
              about="A modern hair salon."
              services={['Haircuts', 'Hair Treatments', 'Hair Coloring', 'Styling']}
              onBookClick={(name) => alert(`Booking ${name}`)}
            />

            <Homepage_Card
              businessName="Iconic Tattoo"
              address="38019 Park Blvd"
              images={['https://media.timeout.com/images/105165480/750/562/image.jpg']}
              about="Tattoo artistry starts here."
              services={['Tattoo', 'Piercings']}
              onBookClick={(name) => alert(`Booking ${name}`)}
            />

            <Homepage_Card
              businessName="Dave's Barber Shop"
              address="2391 Sunset Ln"
              images={['https://detroitbarbers.com/cdn/shop/t/4/assets/db-barbershop-page-corktown-gallery-a.jpg?v=2985141150787217361509093960']}
              about="Straight shaves, straight styles."
              services={['Haircuts', 'Fade', 'Colorings']}
              onBookClick={(name) => alert(`Booking ${name}`)}
            />
          </div>
        </div>
      </div>

      {/* Sidebar and Search Results */}
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
