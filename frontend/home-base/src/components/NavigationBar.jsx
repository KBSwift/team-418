import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import HomeBase from '../assets/HomeBase.svg';
import '../components/styles/NavigationBarStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useAuth } from './AuthContext';


const NavigationBar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/api/logout');
      logout();
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error.response?.data?.message || "An unexpected error occurred");
    }
  };

  const navbarStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem' 
  }; //can add specific in-line styling to the navbar here 

  if(location.pathname === "/") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top" style={navbarStyle}>
      <a className="navbar-brand" href="/edit">
        <nav className="navbar navbar-light bg-light">
          <img src={HomeBase} width="30" height="30" className="d-inline-block align-top" alt="HomeBase Logo" />
          HomeBase
      </nav>
      </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/filter-change">
              Replace Filter 
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/filter-history">
              Filter History 
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/notification-history">
              Notification History 
            </a>
          </li>
        <li className="nav-item">
            <a className="nav-link" href="/edit">
              Edit
            </a>
        </li>
        </ul>
         <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.username}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
    </nav>
  );
  
};

export default NavigationBar;