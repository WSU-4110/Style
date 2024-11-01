'use client'

import React from 'react';
import './navbar_artist.css';
import { useRouter } from 'next/navigation';
import { navbarstrat } from './navbarstrat';

export class artistnavbar implements navbarstrat {
  renderNavbar = () => {
    const router = useRouter();

  return (
    <nav className="navigation">
      <ul>
        <li><button onClick={() => router.push('/homepage')}>Home</button></li>
        <li><button onClick={() => router.push('/portfolio')}>Portfolio</button></li>
        <li><button onClick={() => router.push('/clients')}>Clients</button></li>
        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
        <li><button onClick={() => { localStorage.removeItem('authToken'); alert('Logging out'); router.push('/'); }}>Log Out</button></li>
      </ul>
    </nav>
  );
}
}