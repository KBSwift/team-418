import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/navigation" element={ <Navigation/> } />
      </Routes>
    </Router>
  );
};

export default Routing;