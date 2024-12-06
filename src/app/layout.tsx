import type { Metadata } from "next";
import React from 'react';
import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from './components/navbar_wrapper';

// Import Sinera font
const sinera = localFont({
  src: "./fonts/Sinera.woff",
  variable: "--font-sinera",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Style - Simplified Business and Exposure",
  description: "Welcome to Style, your gateway to simplified business solutions and exposure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sinera.variable} antialiased bg-[#f7f6ee] text-gray-900`}
      >
        <NavbarWrapper />

        <main className="min-h-screen p-6 md:p-12 lg:p-16">
          {children}
        </main>

        <footer className="bg-black text-white py-8 text-center rounded-t-xl shadow-lg w-full">
          <p className="text-lg font-light">&copy; 2024 Style. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="/" className="text-white hover:underline mx-4">Get Started</a>
            <a href="#" className="text-white hover:underline mx-4">Privacy Policy</a>
            <a href="#" className="text-white hover:underline mx-4">Terms of Service</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
