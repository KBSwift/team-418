import React from 'react';
import { Link } from 'react-router-dom';
import HomeBase from '../assets/HomeBase.svg';
import '../components/styles/NavigationBarStyle.css';



const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="/">
            <img src={HomeBase} width="30" height="30" class="d-inline-block align-top" alt="HomeBase Logo" />
            HomeBase
          </a>
      </nav>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/signup">
              Sign-up 
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Log-in
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
              <a className="dropdown-item" href="/filters">
                Filters
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
  
};



export default NavigationBar;

{/*  export default function NavigationBar () {
  return <nav className='nav'>
       <a href='/' className='HomeBase'>
       <img src= {HomeBase} alt="HomeBase Logo" className='nav-logo' />
         HomeBase
       </a>
       <ul>
        <li>
           <a href="/login">Log-in</a>
         </li>
         <li>
          <a href="/signup">Sign-up</a>
         </li>
       </ul>

   </nav>
 } */}
