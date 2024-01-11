import React from 'react';
import './App.css'
import Routes from './Routes'
import NavigationBar from './components/NavigationBar'
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter


function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //need to add a log-in state for the navigation bar (to ignore landing, signup, and login page)
  
  return (
    <AuthProvider>
    <div className='App'>
      <Routes />
    </div>
    </AuthProvider>
  )
}

export default App