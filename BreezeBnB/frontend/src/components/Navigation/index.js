import React from 'react';
import { NavButton } from './NavButton';
import './Navigation.css';
import { LoginFormModal } from '../LoginFormModal';
import { SignupFormModal } from '../SignupFormModal';
import { useSelector } from 'react-redux';

export const Navigation = () => {
    const modal = useSelector(state => state.ui.modal)
    return (
        <nav>
            <div>
                <img src='../../assets/airbnb_logo_icon_170605.png'></img>
            </div>
            <div>Search Bar</div>
            <NavButton />
            {modal === 'login' && (<LoginFormModal />)}  
            {modal === 'signup' && (<SignupFormModal />)}
        </nav>
    );
}
