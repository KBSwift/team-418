import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/views/Signup';
import NavigationBar from './components/NavigationBar';
import Landing from './components/views/Landing';
import Signup from './components/views/Signup';
import FilterChangeCard from './pages/FilterChangeCard';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/filter-change" element={<FilterChangeCard/>} />
      </Routes>
    </Router>
  );
};

export default Routing;