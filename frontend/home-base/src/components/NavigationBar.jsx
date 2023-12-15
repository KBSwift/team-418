import React from 'react';
import { Link } from 'react-router-dom';
import HomeBase from '../assets/HomeBase.svg';
import '../components/styles/NavigationBarStyle.css';

export default function NavigationBar () {
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
}