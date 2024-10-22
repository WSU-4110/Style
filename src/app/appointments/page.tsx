/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Navbar from '../components/navigationbar';

const Appointment = () => {
    return (
      <div className="min-h-screen bg-gray">
      <Navbar />
      <div className="flex items-start justify-start p-4">
          <h1 className="text-2xl font-bold">Appointments</h1>
      </div>
  </div>
    );
};
export default Appointment;