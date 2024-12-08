/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/ui/appointment_card';

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

const sampleAppointments: AppointmentType[] = [
  {
    id: 1,
    businessName: "Nail Palace",
    service: "Manicure",
    amountDue: "$50.00",
    date: "12/26/2024",
    time: "2:00 PM EST",
    address: "829 Maple St, Oak Park, MI",
  },
  {
    id: 2,
    businessName: "Hairloft Salon",
    service: "Hair Treatment",
    amountDue: "$60.00",
    date: "12/19/2024",
    time: "10:00 AM EST",
    address: "7890 Oak Ave, Grand Rapids, MI",
  },
  {
    id: 3,
    businessName: "Iconic Tattoo",
    service: "Piercing",
    amountDue: "$25.00",
    date: "12/28/2024",
    time: "9:00 AM EST",
    address: "38019 Park Blvd, Oakman, MI",
  },
];

const initialHistory: AppointmentType[] = [
  {
    id: 1,
    businessName: "Dave's Barbershop",
    service: "Haircut",
    amountDue: "$45.00",
    date: "11/24/2024",
    time: "4:00 PM EST",
    address: "2391 Sunset Ln, Grove, MI",
  },
];

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [history, setHistory] = useState<AppointmentType[]>(initialHistory);
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
            id: cancelledAppointment.id * 1000 + Date.now(),
            cancelledOn: new Date().toLocaleDateString("en-US"), // MM/DD/YYYY
          },
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

  return (
    <div className="min-h-screen py-6 px-8 bg-gray">
      <div className="max-w-full mx-auto bg-white p-8 rounded-md shadow-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center">
          Appointments Overview
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-lg font-semibold text-[#d8ba7a] border-b border-gray-900 pb-2 mb-6">
              Upcoming Appointments
            </h2>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    onCancel={cancelAppointment}
                    onViewDetails={viewDetails}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No upcoming appointments.</p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-[#d8ba7a] border-b border-gray-900 pb-2 mb-6">
              Appointment History
            </h2>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    isHistory
                    onViewDetails={viewDetails}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No past appointments available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
