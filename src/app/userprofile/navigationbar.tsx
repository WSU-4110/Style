'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <ul>
        <li><button onClick={() => router.push('/home')}>Home</button></li>
        <li><button onClick={() => router.push('/about')}>About</button></li>
        <li><button onClick={() => router.push('/profile')}>Profile</button></li>
        <li><button onClick={() => router.push('/help')}>Help</button></li>
        <li><button onClick={() => router.push('/logout')}>Log Out</button></li>
      </ul>
    </nav>
  );
}

