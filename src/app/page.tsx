'use client'; 

//import Image from "next/image";
import { useCallback } from "react";

export default function Home() {
  const showAlert = useCallback(() => {
    alert("Get Started!");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <header className="bg-blue-500 text-white p-8 w-full">
        <h1 className="text-4xl font-bold">Welcome to Style</h1>
        <p className="mt-4 text-lg">Gateway to Simplified Business and Exposure</p>
        <button
          onClick={showAlert}
          className="mt-6 bg-white text-blue-500 py-2 px-4 rounded-lg shadow-lg hover:bg-blue-100"
        >
          Get Started
        </button>
      </header>

      <section className="mt-10 p-8">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-4">Learn more about our journey and offerings.</p>
      </section>

      <footer className="mt-auto py-8 bg-gray-800 text-white w-full text-center">
        <p>&copy; 2024 Style. All rights reserved.</p>
      </footer>
    </div>
  );
}
