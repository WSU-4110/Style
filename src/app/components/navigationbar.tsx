'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import './navigationbar.css';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userRole = localStorage.getItem('role');
      setRole(userRole || '');
    }
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false); 
      setIsAuthChecked(true); 
    });

    return () => unsubscribe();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('role');
    auth.signOut();
    alert('Logging out');
    router.push('/');
  };
  if (isLoading || !isAuthChecked) {
    return null; 
  }

  return (
    <nav className="navigation">
      <ul>
        <li>
          <button onClick={() => router.push('/homepage')}>Home</button>
        </li>
        
        {role === 'artist' && (
          <>
            <li>
              <button onClick={() => router.push('/portfolio')}>Portfolio</button>
            </li>
            <li>
              <button onClick={() => router.push('/clients')}>Clients</button>
            </li>
          </>
        )}

        {role === 'customer' && (
          <>
            <li>
              <button onClick={() => router.push('/appointments')}>Appointments</button>
            </li>
            <li>
              <button onClick={() => router.push('/userprofile')}>Profile</button>
            </li>
          </>
        )}
        
        <li>
          <button onClick={() => router.push('/helppage')}>Help</button>
        </li>

        {user ? (
          <>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => {
                role === 'artist'
                  ? router.push('/artistlogin')
                  : router.push('/customerlogin');
              }}
            >
              Log In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
