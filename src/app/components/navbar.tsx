'use client'

import React from 'react';
import { navbarstrat } from './navbarstrat';
import { customernavbar } from './navigationbar';
import { artistnavbar } from './navbar_artist';

interface NavbarProps {
    userType: 'customer' | 'artist';
}

export default function Navbar({ userType }: NavbarProps) {
    let navbarStrategy: navbarstrat;
    if (userType === 'artist') {
        navbarStrategy = new artistnavbar();
    } else {
        navbarStrategy = new customernavbar();
    }
    return navbarStrategy.renderNavbar();
}