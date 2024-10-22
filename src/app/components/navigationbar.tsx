'use client'

import React from 'react';
import './navigationbar.css';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handlelogout = () => {
    localStorage.removeItem('authToken');
    alert('Logging out');
    router.push('/');
  }

  return (
    <nav className="navigation">
      <ul>
        <li><button onClick={() => router.push('/homepage')}>Home</button></li>
        <li><button onClick={() => router.push('/appointments')}>Appointments</button></li>
        <li><button onClick={() => router.push('/userprofile')}>Profile</button></li>
        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
        <li><button onClick={handlelogout}>Log Out</button></li>
      </ul>
    </nav>
  );
}