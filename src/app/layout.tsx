import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; // Changed to CSS, assuming you are using Tailwind CSS for global styles

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Style - Simplified Business and Exposure",
  description: "Welcome to Style, your gateway to simplified business solutions and exposure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        {/* Global Header can be added here if you need it on every page */}
        <header className="bg-blue-500 text-white p-4 text-center">
          <h1 className="text-2xl">Style</h1>
        </header>
        {/* Content */}
        {children}
        {/* Global Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center mt-auto">
          <p>&copy; 2024 Style. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}