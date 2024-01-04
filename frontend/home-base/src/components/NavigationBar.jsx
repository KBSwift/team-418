import React from 'react';
import { Link } from 'react-router-dom';
import HomeBase from '../assets/HomeBase.svg';
import '../components/styles/NavigationBarStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavigationBar = () => {

  const navbarStyle = {
    paddingLeft: '1rem' 
  }; //can add specific in-line styling to the navbar here 

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top" style={navbarStyle}>
      <a className="navbar-brand" href="/">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="/">
            <img src={HomeBase} width="30" height="30" class="d-inline-block align-top" alt="HomeBase Logo" />
            HomeBase
          </a>
      </nav>
      </a>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      {/* Cant get dropdown menu to work  */}

      {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/filter-change">
              Replace Filter 
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/account-settings">
              Account
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/edit">
              Edit
            </a>
        </li>
        </ul>
      {/* </div> */}
    </nav>
  );
  
};



export default NavigationBar;

