import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
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
//import Placeholder from './components/RiderList/Placeholder.jsx';
import DriverInteractions from './components/RiderList/DriverInteractions.jsx'
import TripComplete from './components/TripComplete/TripComplete.jsx';

function App() {
  const [userId, setUserId] = useState('');
  const navigate=useNavigate();

  const authenticate = (email, pass) => {
    axios.post('/login', {email, pass})
    .then((result) => {
      setUserId(result.data.user);
      if (result.is_driver) {
        navigate('/driverview');
      } else {
        navigate('/riderview');
      }
    })
    .catch((err) => {
      alert('Incorrect email or password. Please try again.');
    })
  }

  const [riderOnGoingRoute, setRiderOnGoingRoute] = useState({});
  const updateRiderOnGoingRoute = (driverInfo, userRouteInfo) => {
    userRouteInfo.driver_id = driverInfo._id;
    axios.post('/postRiderRoute', userRouteInfo)
    .then((result) => {
      setRiderOnGoingRoute(driverInfo);
      navigate('/riderview')
    })
  }

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path='/register' element={<Register authCheck={authenticate}/>} />
        <Route path='/login' element={<Login authCheck={authenticate}/>} />
        <Route path="/driverview" element={<DriverView userId={userId}/>} />
        <Route path="/ratings-reviews" element={<Reviews />} />
        <Route path="/riderview" element={<RiderView userId={userId} riderOnGoingRoute={riderOnGoingRoute}/>} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/riderprofile" element={<RiderProfile />} />
        <Route path="/driver-list" element={<DriverList updateRiderOnGoingRoute={updateRiderOnGoingRoute}/>} />
        <Route path="/rider-list" element={<DriverInteractions updateRiderOnGoingRoute={updateRiderOnGoingRoute}/>} />
        <Route path="/trip-complete" element={<TripComplete />} />
      </Routes>
    {/* <HelloWorld /> */}
    {/* <DriverView /> */}
    </div>
  )
}

export default App;
