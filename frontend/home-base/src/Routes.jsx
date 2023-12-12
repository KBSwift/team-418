import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Landing from './components/Landing';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={ <Login/> } />
        <Route path="/navigation" element={<Navigation />} />
      </Routes>
    </Router>
  );
};

export default Routing;