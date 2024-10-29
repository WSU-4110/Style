/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
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
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
             try {
                  const response = await fetch('/api/appointments/');
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  setAppointments(data);
              } catch (err) {
                  setError(err.message);
              } finally {
                  setLoading(false);
              }
          };

          fetchAppointments();
      }, []);

      if (loading) return <p>Loading appointments...</p>;
      if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen flex flex-col bg-gray">
            <Navbar />
            <header className="text-black py-7 text-left mt-19">
                <h1 className="text-4xl font-bold text-center tracking-wide mt-2">Current Appointments</h1>
                <br />
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl mx-auto space-y-4">
                    {sampleAppointments.length > 0 ? (
                        sampleAppointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white p-10 border border-yellow-500 rounded-lg shadow">
                                <h2 className="text-2xl font-bold mb-2">{appointment.businessName}</h2>
                                <p className="text-gray-500">Service: {appointment.service}</p>
                                <p className="text-gray-500">Amount Due: {appointment.amountDue}</p>
                                <p className="text-gray-500">Date: {appointment.date}</p>
                                <p className="text-gray-500">Time: {appointment.time}</p>
                                <p className="text-gray-500">Address: {appointment.address}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-red">No appointments scheduled.</p>
                    )}
                </div>
            </main>
        </div>
    );
  };
export default Appointment;