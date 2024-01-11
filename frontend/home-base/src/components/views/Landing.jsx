import React from 'react';
import HomeBase from '../../assets/HomeBase.svg';
import Loft from '../../assets/Loft.jpg';
import { Link } from 'react-router-dom';
import '../styles/LandingStyles.css';



const Landing = () => {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <img src={HomeBase} alt="HomeBase Logo" className="landing-logo" />
            <h1 className="masthead-brand">HomeBase</h1>
            <nav className="nav nav-masthead justify-content-center"> 
            </nav>
  
        <main role="main" className="inner cover">
          <p className="lead">
            Filter your air like you filter your water. Get reminders when it's time to switch with HomeBase.
          </p>
          <p className="lead">
            <a href="/signup" className="btn btn-lg btn-secondary">
              Sign Up
            </a>
          </p>
          <p className="lead">
            <a href="/login" className="btn btn-lg btn-secondary">
              Log In
            </a>
          </p>
        </main>
  
        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              HomeBase 2023
            </p>
          </div>
        </footer>
      </div>
    );
  };
  
export default Landing;
