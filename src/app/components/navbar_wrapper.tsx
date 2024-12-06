"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navigationbar'; 

export default function NavbarWrapper() {
  const pathname = usePathname(); 
  const noNavbarRoutes = ['/customerlogin', '/', '/artistlogin'];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return <>{showNavbar && <Navbar />}</>;
}
