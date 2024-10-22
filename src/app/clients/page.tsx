/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Nav_bar from '../components/navbar_artist';

const Clients: React.FC = () => {
    const router = useRouter();

    // Sample client bookings data structure
    const bookings = [
        { id: 1, clientName: 'Terry Springer', service: 'Haircut', date: '2024-10-27', amountDue: '$45' },
        { id: 2, clientName: 'Tom Jerry', service: 'Hair Coloring', date: '2024-11-03', amountDue: '$90' },
        { id: 3, clientName: 'Louis Blake', service: 'Haircut', date: '2024-11-13', amountDue: '$45'},
        { id: 4, clientName: 'Rob Zullo', service: 'Trim', date: '2024-11-17', amountDue: '$25' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray">
            <Nav_bar />
            <header className="text-black py-7 text-left mt-19">
                <h1 className="text-3xl font-bold tracking-wide text-teal-500">Barbers R Us</h1>
                <h2 className="text-4xl tracking-wide mt-2">Upcoming Bookings</h2>
                <br />
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl mx-auto space-y-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white p-7 border border-teal-500 rounded-lg shadow">
                            <h3 className="text-xl font-normal">{booking.clientName}</h3>
                            <p className="text-gray-400">Service Requested: {booking.service}</p>
                            <p className="text-gray-400">Amount Due: {booking.amountDue}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default Clients;