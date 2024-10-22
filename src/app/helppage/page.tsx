'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navigationbar';

const HelpPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray"> {/* Ensure full height and background */}
            <Navbar />
            <div className="max-w-screen-xl mx-auto p-12 bg-white shadow-lg rounded-lg"> {/* Centered content with max width */}
                <h1 className="text-4xl font-bold text-center mb-6">Help Page</h1>
                <p className="text-center">How can we help?</p>
            </div>
        </div>
    );
};

export default HelpPage;