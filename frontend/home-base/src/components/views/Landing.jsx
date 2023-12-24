import React from 'react';
import HomeBase from '../../assets/HomeBase.svg';
import Loft from '../../assets/Loft.jpg';
import { Link } from 'react-router-dom';
import '../styles/LandingStyles.css';

export default function Landing() {
   

    return (
        <div className='App'>
            
            <div
                className='landing-cover'
                style={{
                    backgroundImage: `url(${Loft})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', 
                    height: '500px',
                    width: "1920px"
                }}
            >
                <div className='landing-name'>
                <img src={HomeBase} alt="HomeBase Logo" className="landing-logo" />
                <h1>HomeBase</h1>
                </div>
                <div className='signup'>
                    <h2>
                    <a href="/signup">
                        Sign-up
                    </a>
                </h2>
                </div>
                <div className='login'>
                    <h2>Log-in</h2>
                </div>
        
            </div>
        </div>
        
    );
}
