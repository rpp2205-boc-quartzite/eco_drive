import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Login } from './components/Authentication/Login.jsx';
import { Register } from './components/Authentication/Register.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import DriverProfile from './components/UserProfile/DriverProfile.jsx';
import RiderProfile from './components/UserProfile/RiderProfile.jsx';
import TripComplete from './components/TripComplete/TripComplete.jsx';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<TripComplete />} />
        <Route path="/driverview" element={<DriverView />} />
        <Route path="/riderview" element={<RiderView />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/riderprofile" element={<RiderProfile />} />
        <Route path="/tripcomplete" element={<TripComplete />} />
      </Routes>

      {/* <div className="App">
        {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
    </div> */}
    </div>
  )
}

export default App;
