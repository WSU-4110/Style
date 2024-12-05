/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaHistory } from 'react-icons/fa';

interface AppointmentType {
  id: number;
  businessName: string;
  service: string;
  amountDue: string;
  date: string;
  time: string;
  address: string;
  cancelledOn?: string;
}

// Sample appointments data
const sampleAppointments: AppointmentType[] = [
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

const initialHistory: AppointmentType[] = [
  {
    id: 1,
    businessName: "Barbers R Us",
    service: "Haircut",
    amountDue: "$45.00",
    date: "2024-10-24",
    time: "4:00 PM EST",
    address: "1234 Maple St, Lansing, MI"
  }
];

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [history, setHistory] = useState<AppointmentType[]>(initialHistory);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAppointments(sampleAppointments);
    setLoading(false);
  }, []);

  const cancelAppointment = (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (isConfirmed) {
      const cancelledAppointment = appointments.find((appointment) => appointment.id === id);
      if (cancelledAppointment) {
        setHistory([
          ...history,
          {
            ...cancelledAppointment,
            cancelledOn: new Date().toISOString().split("T")[0]
          }
        ]);
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      }
    }
  };

  const viewDetails = (id: number) => {
    const appointment = [...appointments, ...history].find((appointment) => appointment.id === id);
    if (appointment) {
      alert(`
        Appointment Details:
        Business: ${appointment.businessName}
        Service: ${appointment.service}
        Amount Due: ${appointment.amountDue}
        Date: ${appointment.date}
        Time: ${appointment.time}
        Address: ${appointment.address}
      `);
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-md shadow-md border border-gray-900">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Appointments</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-medium text-teal-600 mb-4">Upcoming Appointments</h2>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="relative flex items-start justify-between bg-gray-50 p-6 rounded-md shadow-sm border-2 border-black"
                  >
                    <div className="flex flex-col space-y-2 w-2/3">
                      <h3 className="text-lg font-medium text-gray-900">{appointment.businessName}</h3>
                      <p className="text-sm text-gray-700">{appointment.service}</p>
                      <div className="flex items-center text-gray-700 text-sm">
                        <FaCalendarAlt className="mr-2 text-xl text-gray-500" />
                        <span>{appointment.date}, {appointment.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <FaDollarSign className="mr-2 text-xl text-gray-500" />
                        <span>{appointment.amountDue}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <FaMapMarkerAlt className="mr-2 text-xl text-gray-500" />
                        <span>{appointment.address}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition-all text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => viewDetails(appointment.id)}
                        className="bg-teal-500 text-white py-1 px-4 rounded-md hover:bg-teal-600 transition-all text-xs"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500">No appointments scheduled.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-medium text-teal-600 mb-4">Appointment History</h2>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start bg-gray-50 p-6 rounded-md shadow-sm border-2 border-black"
                  >
                    <FaHistory className="mr-4 text-gray-500 text-3xl" />
                    <div className="flex flex-col space-y-1 w-full">
                      <h3 className="text-md font-medium text-gray-700">{appointment.businessName}</h3>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                      {appointment.cancelledOn ? (
                        <span className="text-xs text-red-500 font-semibold">
                          Cancelled on {appointment.cancelledOn}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">Completed on {appointment.date}</span>
                      )}
                      <button
                        onClick={() => viewDetails(appointment.id)}
                        className="bg-teal-500 text-white py-1 px-4 rounded-md hover:bg-teal-600 transition-all text-xs self-end mt-2"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
