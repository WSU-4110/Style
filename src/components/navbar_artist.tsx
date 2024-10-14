'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <ul>
        <li><button onClick={() => router.push('/homepage')}>Home</button></li>
        <li><button onClick={() => router.push('/profile')}>Portfolio</button></li>
        <li><button onClick={() => router.push('/appointments')}>Clients</button></li>
        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
        <li><button onClick={() => router.push('/logout')}>Log Out</button></li>
      </ul>
    </nav>
  );
}