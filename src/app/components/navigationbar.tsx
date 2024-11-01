'use client'

import React from 'react';
import './navigationbar.css';
import { navbarstrat } from './navbarstrat';
import { useRouter } from 'next/navigation';

export class customernavbar implements navbarstrat {
  renderNavbar = () => {
  const router = useRouter();
  return (
    <nav className="navigation">
      <ul>
        <li><button onClick={() => router.push('/homepage')}>Home</button></li>
        <li><button onClick={() => router.push('/appointments')}>Appointments</button></li>
        <li><button onClick={() => router.push('/userprofile')}>Profile</button></li>
        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
        <li><button onClick={() => { localStorage.removeItem('authToken'); alert('Logging out'); router.push('/'); }}>Log Out</button></li>
      </ul>
    </nav>
  );
}
}