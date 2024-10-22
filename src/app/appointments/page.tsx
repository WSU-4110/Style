/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Navbar from '../components/navigationbar';

const Appointment = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <Navbar />
            <h1 className="text-3xl font-bold">This is the Appointments Page</h1>
        </div>
    );
};
export default Appointment;