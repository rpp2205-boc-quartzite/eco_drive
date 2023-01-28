<<<<<<< HEAD
import React from 'react';
import TripComplete from './components/tripComplete.jsx';

function App() {
  return (
    <TripComplete/>
=======
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HelloWorld from './components/helloWorld.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import DriverProfile from './components/UserProfile/DriverProfile.jsx';
import RiderProfile from './components/UserProfile/RiderProfile.jsx';
import { Login } from './components/Authentication/Login.jsx';
import { Register } from './components/Authentication/Register.jsx';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  // var testDB = () => {
  //   axios.post('database')
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err))
  // }

  // testDB();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HelloWorld />} />
        <Route path="/driverview" element={<DriverView />} />
        <Route path="/riderview" element={<RiderView />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/riderprofile" element={<RiderProfile />} />
      </Routes>
    {/* <HelloWorld /> */}
    {/* <DriverView /> */}
    {/* <div className="App">
      <HelloWorld />
      {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
  </div> */}
    </div>
>>>>>>> 32900611a356cfa2c1162e6812e32098486fc247
  )
}

export default App;
