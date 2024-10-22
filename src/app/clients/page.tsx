/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Nav_bar from '../components/navbar_artist';

const Clients: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray">
            <header className="text-black py-7 text-center">
                <h1 className="text-5xl font-bold tracking-wide">Clients</h1>
            </header>
            <Nav_bar />
            <main className="flex-grow flex flex-col items-center justify-center">
            </main>
        </div>
    );
};
export default Clients;