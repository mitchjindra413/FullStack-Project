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
                <div>
                    <img src='https://breezebnb-prod.s3.us-west-2.amazonaws.com/assets/GitHub-Mark-64px.png' alt='logo'></img>
                    <h2>breezebnb</h2>
                </div>
            </Link>
            <div>Search Bar</div>
            <NavButton />
            {modal === 'login' && (<LoginFormModal />)}  
            {modal === 'signup' && (<SignupFormModal />)}
        </nav>
    );
}
