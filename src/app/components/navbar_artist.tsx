//'use client'

//import React, { useState, useEffect } from 'react';
//import './navbar_artist.css';
//import { useRouter } from 'next/navigation';
//import { auth } from '../firebase'; 

//export default function NavbarArtist() {
//  const router = useRouter();
//  const [user, setUser] = useState(null); 
//  const [role, setRole] = useState(''); 
//  const [isLoading, setIsLoading] = useState(true); 

//  useEffect(() => {
//    const userRole = localStorage.getItem('role');
//    setRole(userRole || '');

//    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//      setUser(currentUser);
//      setIsLoading(false);
//    });

//    return () => unsubscribe();
//  }, []);

//  const handleLogout = () => {
//    localStorage.removeItem('role'); 
//    auth.signOut(); 
//    alert('Logging out');
//    router.push('/'); 
//  };

//  if (isLoading) {
//    return null; 
//  }

//  if (role !== 'artist') {
//    return null;
//  }

//  return (
//    <nav className="navigation">
//      <ul>
//        <li><button onClick={() => router.push('/homepage')}>Home</button></li>
//        <li><button onClick={() => router.push('/portfolio')}>Portfolio</button></li>
//        <li><button onClick={() => router.push('/clients')}>Clients</button></li>
//        <li><button onClick={() => router.push('/helppage')}>Help</button></li>
//        {user ? (
//          <>
//            <li>Welcome, {user.displayName || user.email}</li>
//            <li><button onClick={handleLogout}>Log Out</button></li>
//          </>
//        ) : (
//          <li><button onClick={() => router.push('/artistlogin')}>Log In</button></li>
//        )}
//      </ul>
//    </nav>
//  );
//}