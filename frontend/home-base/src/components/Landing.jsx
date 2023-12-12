import React from 'react';
import HomeBase from '../assets/HomeBase.svg';
import { Link } from 'react-router-dom';

export default function Landing() {
   

    return (
        <div className='App'>
            <img src={HomeBase} alt="HomeBase Logo" className="logo" />
            <h1>HomeBase</h1>
        </div>
    );
}