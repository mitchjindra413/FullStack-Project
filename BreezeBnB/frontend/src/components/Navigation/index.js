import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavButton } from './NavButton';
import './Navigation.css';
import { LoginFormModal } from '../LoginFormModal';

export const Navigation = () => {
    return (
        <nav>
            <div>Logo</div>
            <div>Search Bar</div>
            <LoginFormModal></LoginFormModal>
            <NavButton />
        </nav>
    );
}
