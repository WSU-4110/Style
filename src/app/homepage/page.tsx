'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Homepage_Card from '../components/ui/homepage_card';
import Sidebar from '../components/Sidebar';
import './homepage.css';
import background from '../../public/homepage_bg.png';
import AutoRefreshPage from '../refresh_page';

interface Category {
  name: string;
  businessName: string;
  address: string;
  images: string[];
  about: string;
  services: string[];
  route: string;
}

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Nail Palace',
      businessName: 'Nail Palace',
      address: '829 Maple St, Oak Park, MI',
      images: ['https://www.greentoestucson.com/wp-content/uploads/2021/06/Nail-Salons-Tucson.jpeg'],
      about: 'A relaxing nail salon offering the best manicures and pedicures.',
      services: ['Manicure', 'Pedicure', 'Nail Art'],
      route: '/nailsalon',
    },
    {
      name: 'Hairloft Salon',
      businessName: 'Hairloft Salon',
      address: '8192 Oakman St, Alemond, MI',
      images: ['https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg'],
      about: 'A modern hair salon specializing in creating stunning hairstyles for every occasion.',
      services: ['Haircuts', 'Hair Treatments', 'Hair Coloring', 'Styling'],
      route: '/hair',
    },
    {
      name: 'Iconic Tattoo',
      businessName: 'Iconic Tattoo',
      address: '38019 Park Blvd, Oakman, MI',
      images: ['https://media.timeout.com/images/105165480/750/562/image.jpg'],
      about: 'Tattoo artistry starts here.',
      services: ['Tattoo', 'Piercings'],
      route: '/tattoo',
    },
    {
      name: "Dave's Barber Shop",
      businessName: "Dave's Barber Shop",
      address: '2391 Sunset Ln, Grove, MI',
      images: ['https://detroitbarbers.com/cdn/shop/t/4/assets/db-barbershop-page-corktown-gallery-a.jpg?v=2985141150787217361509093960'],
      about: 'A barbershop with a classic touch, offering precision haircuts and grooming services tailored to you.',
      services: ['Haircuts', 'Fade', 'Colorings'],
      route: '/barber',
    },
  ]);
  const [searchResults, setSearchResults] = useState<Category[]>(categories);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (term: string) => {
    const filteredResults = term
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(term.toLowerCase())
        )
      : categories;
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  return (
    <div className="relative w-full">
      <AutoRefreshPage />
      <div
        className="relative w-full h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-wide text-white">Explore</h1>
          <p className="mt-2 text-lg typing-effect">Search Artists Here to Connect...</p>
          <div className="relative w-full max-w-md mx-auto mt-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full bg-gray-100 py-8 border border-black rounded-lg shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recommended</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((result, index) => (
              <Homepage_Card
                key={index}
                businessName={result.businessName}
                address={result.address}
                images={result.images}
                about={result.about}
                services={result.services}
                route={result.route}
                onBookClick={(name) => router.push(result.route)}
              />
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
