'use client'

import React from 'react';
import './navbar_artist.css';
import { useRouter } from 'next/navigation';

export default function Nav_bar() {
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
        <li><button onClick={() => router.push('/portfolio')}>Portfolio</button></li>
        <li><button onClick={() => router.push('/appointments')}>Clients</button></li>
        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
        <li><button onClick={handlelogout}>Log Out</button></li>
      </ul>
    </nav>
  );
}