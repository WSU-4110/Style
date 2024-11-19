import type { Metadata } from "next";
import React from 'react';
import localFont from "next/font/local";
//import { useState, useEffect } from 'react';
import "./globals.css"; // Assuming Tailwind CSS is used for global styles
import Navbar from './components/navigationbar';


// Import Sinera font
const sinera = localFont({
  src: "./fonts/Sinera.woff",
  variable: "--font-sinera",
  weight: "100 900", // Adjust the weight range if needed
});

export const metadata: Metadata = {
  title: "Style - Simplified Business and Exposure",
  description: "Welcome to Style, your gateway to simplified business solutions and exposure.",
};

//interface RootLayoutProps {
//  children: React.ReactNode;
//}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isNavbarDisabled =
    React.Children.toArray(children).some(
      (child: any) => child.props && child.props.noNavbar
    );

  
  return (
    <html lang="en">
      <body
        className={`${sinera.variable} ${sinera.variable} antialiased bg-gradient-to-br from-yellow-50 via-pink-50 to-orange-100 text-gray-900`} // Gradient background for a summery vibe
      >
        {!isNavbarDisabled && <Navbar />}
        {/* Content */}
        <main className="min-h-screen p-6 md:p-12 lg:p-16">
          {children}
        </main>

        {/* Global Footer */}
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
