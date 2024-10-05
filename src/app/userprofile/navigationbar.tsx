'use client'

import React from 'react';
import Link from 'next/navigation'; 

const Navbar: React.FC<{ userType: 'customer' | 'artist' }> = ({ userType }) => {
  return (
    <nav>
      <ul>
        <li><Link href="/home">Home</Link></li> {/*  */}
        <li><Link href="/about">About</Link></li>
        {userType === 'customer' ? (
          <>
            <li><Link href="/appointments">My Appointments</Link></li>
            <li><Link href="/favorites">Favorites</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/business-dashboard">Dashboard</Link></li>
            <li><Link href="/clients">Client List</Link></li>
          </>
        )}
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/help">Help</Link></li>
        <li><Link href="/logout">Log Out</Link></li>
      </ul>
    </nav>
  );
}; 


