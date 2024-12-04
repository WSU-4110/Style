/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';  

interface AppointmentType {
  id: number;
  businessName: string;
  service: string;
  amountDue: string;
  date: string;
  time: string;
  address: string;
}

// Sample appointments data
const sampleAppointments: AppointmentType[] = [
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
  {
    id: 4,
    businessName: "Yoga Studio",
    service: "Yoga Class",
    amountDue: "$25.00",
    date: "2024-11-03",
    time: "9:00 AM EST",
    address: "1010 Sunrise Blvd, Detroit, MI"
  },
  {
    id: 5,
    businessName: "Coffee Shop",
    service: "Coffee & Croissant",
    amountDue: "$8.50",
    date: "2024-11-05",
    time: "8:30 AM EST",
    address: "2222 Caffeine St, Kalamazoo, MI"
  },
];

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAppointments(sampleAppointments);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-md shadow-md border border-black">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Upcoming Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start justify-between bg-gray-50 p-6 rounded-md shadow-sm">
                <div className="flex flex-col space-y-2 w-2/3">
                  <h2 className="text-lg font-medium text-gray-700">{appointment.businessName}</h2>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaCalendarAlt className="mr-2 text-xl text-gray-500" />
                    <span>{appointment.date}, {appointment.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaDollarSign className="mr-2 text-xl text-gray-500" />
                    <span>{appointment.amountDue}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-xl text-gray-500" />
                    <span>{appointment.address}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-center w-1/6 justify-between mb-14">
                  <button
                    onClick={() => alert('Appointment canceled!')}
                    className="bg-red-500 text-white py-2.5 px-6 rounded-md hover:bg-red-600 transition-all text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => alert('Navigating to more details...')}
                    className="bg-teal-500 text-white py-2.5 px-6 rounded-md hover:bg-teal-600 transition-all text-xs"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">No appointments scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default Appointment;
