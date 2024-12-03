/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useState, useEffect } from 'react';

interface AppointmentType {
  id: number;
  businessName: string;
  service: string;
  amountDue: string;
  date: string;
  time: string;
  address: string;
}

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
];

const UserAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Replace with the actual API call to fetch user-specific appointments
        const response = await fetch('/api/user/appointments');
        if (!response.ok) throw new Error('Failed to load appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError('Error loading appointments');
      } finally {
        setLoading(false);
      }
    };

    // Load sample appointments initially (you can remove this once you have API data)
    setAppointments(sampleAppointments);

    // Uncomment this line to fetch data from the server
    // fetchAppointments();
  }, []);

  const handleCancelAppointment = (id: number) => {
    // Logic to handle cancellation (this could trigger an API call)
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handleRescheduleAppointment = (id: number) => {
    // Logic for rescheduling (open a modal, or navigate to a new page to reschedule)
    console.log(`Rescheduling appointment with ID: ${id}`);
  };

  if (loading) return <div>Loading appointments...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Upcoming Appointments</h1>
      <div>
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <div key={appointment.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h3>{appointment.businessName}</h3>
              <p><strong>Service:</strong> {appointment.service}</p>
              <p><strong>Amount Due:</strong> {appointment.amountDue}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
              <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel Appointment</button>
              <button onClick={() => handleRescheduleAppointment(appointment.id)}>Reschedule Appointment</button>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
};

export default UserAppointments;
