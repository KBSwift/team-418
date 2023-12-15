import React from 'react';
import './App.css'
import Routes from './Routes'
import NavigationBar from './components/NavigationBar'

function App() {

  const LandingPage = window.location.pathname === '/';

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