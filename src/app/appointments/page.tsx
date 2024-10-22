/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import Navbar from '../components/navigationbar';

const sampleAppointments = [
  {
      id: 1,
      businessName: "Barbers R Us",
      service: "Haircut",
      amountDue: "$45.00",
      date: "2024-10-24",
      time: "4:00 PM EST",
      address: "1234 Maple St, Lansing, MI"
  },
  {
      id: 2,
      businessName: "The Nail Bar",
      service: "Manicure",
      amountDue: "$50.00",
      date: "2024-10-26",
      time: "2:00 PM EST",
      address: "4567 Tree Rd, Ann Arbor, MI"
  },
  {
      id: 3,
      businessName: "Beauty Salon",
      service: "Facial",
      amountDue: "$60.00",
      date: "2024-11-01",
      time: "10:00 AM EST",
      address: "7890 Oak Ave, Grand Rapids, MI"
  },
];

const Appointment = () => {
  return (
      <div className="min-h-screen bg-gray">
          <Navbar />
          <div className="max-w-2xl mx-auto p-6 bg-black shadow-lg rounded-lg mt-16">
              <h1 className="text-3xl font-bold text-center mb-4 text-[#f4d9a0]">Current Appointments</h1>
              {sampleAppointments.length > 0 ? (
                  <ul className="space-y-4">
                      {sampleAppointments.map((appointment) => (
                          <li key={appointment.id} className="p-4 border rounded shadow-sm text-[#f4d9a0]">
                              <h2 className="text-xl font-semibold">{appointment.businessName}</h2>
                              <p className="text-white">Service: {appointment.service}</p>
                              <p className="text-white">Amount Due: {appointment.amountDue}</p>
                              <p className="text-white">Date: {appointment.date}</p>
                              <p className="text-white">Time: {appointment.time}</p>
                              <p className="text-white">Address: {appointment.address}</p>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-center text-red">No appointments scheduled.</p>
              )}
          </div>
      </div>
  );
};
export default Appointment;