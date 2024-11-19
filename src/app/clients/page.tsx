/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Navbar from '../components/navigationbar';

const Clients: React.FC = () => {
    const router = useRouter();

    // data sample of clients (temporary implementation)
    const bookings = [
        { id: 1, clientName: 'Terry Springer', service: 'Haircut', date: '2024-10-27', amountDue: '$45' },
        { id: 2, clientName: 'John Berry', service: 'Hair Coloring', date: '2024-11-03', amountDue: '$90' },
        { id: 3, clientName: 'Louis Blake', service: 'Haircut', date: '2024-11-13', amountDue: '$45'},
        { id: 4, clientName: 'Rob Zullo', service: 'Trim', date: '2024-11-17', amountDue: '$25' },
    ];

    return (
        <div className="min-h-screen bg-gray">
            <Navbar />
            <header className="text-black py-7 text-left mt-19">
                <h1 className="text-3xl text-center font-bold tracking-wide text-teal-500">Daves Barbershop</h1>
                <h2 className="text-4xl text-center tracking-wide mt-2">Upcoming Bookings</h2>
                <br />
            </header>
            <main className="items-center">
                <div className="w-full max-w-4xl mx-auto space-y-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white p-10 border border-teal-500 rounded-lg shadow">
                            <h3 className="text-xl font-normal mb-1">{booking.clientName}</h3>
                            <p className="text-gray-400">Service Requested: {booking.service}</p>
                            <p className="text-gray-400">Date of Service: {booking.date}</p>
                            <p className="text-gray-400">Amount Due: {booking.amountDue}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default Clients;