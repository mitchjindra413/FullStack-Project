import React from 'react';
import { NavButton } from './NavButton';
import './Navigation.css';
import { LoginFormModal } from '../LoginFormModal';
import { SignupFormModal } from '../SignupFormModal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Navigation = () => {
    const modal = useSelector(state => state.ui.modal)
    return (
        <nav>
            <Link to="/">
                <div id='logo-name'>
                    <img id='logo-pic' src='https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/airbnb_logo_icon_170605.png' alt='logo'></img>
                    <h2>breezebnb</h2>
                </div>
            </Link>
            {/* <div>Search Bar</div> */}
            <NavButton />
            {modal === 'login' && (<LoginFormModal />)}  
            {modal === 'signup' && (<SignupFormModal />)}
        </nav>
    );
}
