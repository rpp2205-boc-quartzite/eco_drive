import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HelloWorld from './components/helloWorld.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import Dashboard from './components/Authentication/Dashboard.jsx';
import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';
import Reviews from './components/RatingsReviews/Reviews.jsx';
import DriverProfile from './components/UserProfile/DriverProfile.jsx';
import RiderProfile from './components/UserProfile/RiderProfile.jsx';
import DriverList from './components/DriverList/DriverList.jsx';

function App() {

  // var testDB = () => {
  //   axios.post('database')
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err))
  // }

  // testDB();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/driverview" element={<DriverView />} />
        <Route path="/riderview" element={<RiderView />} />
        <Route path="/ratings_reviews" element={<Reviews />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/riderprofile" element={<RiderProfile />} />
        <Route path="/driver-list" element={<DriverList />} />
      </Routes>
    {/* <HelloWorld /> */}
    {/* <DriverView /> */}
    </div>
  )
}

export default App;
