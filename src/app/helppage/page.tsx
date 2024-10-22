/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navigationbar';

const HelpPage = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray">
            <Navbar />
            <div className="max-w-screen-xl mx-auto p-12 bg-gray"> 
                <h1 className="text-4xl font-bold text-center mb-6">Help Page</h1>
            </div>   
        </div>
    );
};

export default HelpPage;