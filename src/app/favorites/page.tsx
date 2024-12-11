'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import axios from 'axios';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

interface Favorite {
  id: number;
  name: string;
  imageUrl: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  /*useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/favorites/');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);
  */

  return (
    <div className="min-h-screen flex flex-col bg-white-100">
      <main className="flex-1 p-8 ml-64">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold tracking-wide ml-4">Your Favorites</h1>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="p-4 border rounded-lg shadow-md">
                <Image
                  src={favorite.imageUrl}
                  alt={favorite.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                <h3 className="mt-2 text-lg font-semibold">{favorite.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-xl">You haven’t favorited anything yet.</p>
        )}
      </main>

      <Sidebar />
    </div>
  );
}
