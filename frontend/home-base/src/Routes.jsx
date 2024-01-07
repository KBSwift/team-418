import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Landing from './components/views/Landing';
import Signup from './components/views/Signup';
import Login from './components/views/Login';
import Edit from './components/views/Edit';
import FilterChangeCard from './components/views/FilterChangeCard';
import EditFilter from './components/views/EditFilter';
import AccountSettings from './components/views/AccountSettings'
import { NotificationHistory } from './components/views/NotificationHistory';

const Routing = () => {
  return (
    
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/filter-change" element={<FilterChangeCard/>} />
          <Route path="/editFilter/:id" element={<EditFilter />} />
          <Route path="/account-settings" element={<AccountSettings/>} />
          <Route path="/notification-history" element={<NotificationHistory />} />
        </Routes>
      </Router>
  );
};

export default Routing;