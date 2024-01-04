import React from 'react';
import './App.css'
import Routes from './Routes'
import NavigationBar from './components/NavigationBar'

function App() {

  const LandingPage = window.location.pathname === '/';

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //need to add a log-in state for the navigation bar (to ignore landing, signup, and login page)
  
  return (
    <>
    <div className='App'>
      {!LandingPage && <NavigationBar />} 
      <div>
        <Routes />
      </div>
    </div>
    </>
  )
}

export default App