import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import Dashboard from './components/Authentication/Dashboard.jsx';
import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';
import PasswordReset from './components/Authentication/PasswordReset.jsx';
import ProtectedRoute from './components/Authentication/ProtectedRoutes.jsx';
import Reviews from './components/RatingsReviews/Reviews.jsx';
import DriverProfile from './components/UserProfile/DriverProfile.jsx';
import RiderProfile from './components/UserProfile/RiderProfile.jsx';
import DriverList from './components/DriverList/DriverList.jsx';
import AllReviews from './components/RatingsReviews/AllReviews.jsx';
import DriverInteractions from './components/RiderList/DriverInteractions.jsx'
import TripCompleteRider from './components/TripComplete/TripCompleteRider.jsx';
import TripCompleteDriver from './components/TripComplete/TripCompleteDriver.jsx';

function App() {
  const [userId, setUserId] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);
  const navigate=useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (userId === '') {
      axios.get('/validate')
      .then((result) => {
        setUserId(result.data.userId);
        if (result.is_driver) {
          navigate('/driverview');
        } else {
          navigate('/riderview');
        }
      })
      .catch((err) => {
        console.log('Please register or login.');
      });
    }
  });

  const authenticate = (email, pass) => {
    axios.post('/login', {email, pass})
    .then((result) => {
      setUserId(result.data.user);
      cookies.set('TOKEN', result.data.token, {
        path: "/",
      });
      if (result.is_driver) {
        navigate('/driverview');
      } else {
        navigate('/riderview');
      }
    })
    .catch((err) => {
      setLoginFailure(true);
    })
  };

  const logOut = (event) => {
    cookies.remove('TOKEN', {
      path: "/",
    });
    navigate('/');
  };

  const [riderOnGoingRoute, setRiderOnGoingRoute] = useState({});
  const updateRiderOnGoingRoute = (driverInfo, userRouteInfo, startDistance, endDistance) => {
    userRouteInfo.driver_id = driverInfo._id;
    userRouteInfo.start_distance = startDistance.text;
    userRouteInfo.end_distance = endDistance.text;
    axios.post('/postRiderRoute', userRouteInfo)
    .then((result) => {
      setRiderOnGoingRoute(driverInfo);
      navigate('/riderview')
    })
  };

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path='/register' element={<Register authCheck={authenticate}/>} />
        <Route path='/login' element={<Login authCheck={authenticate} loginFailure={loginFailure}/>} />
        <Route path='/password-reset' element={<PasswordReset authCheck={authenticate}/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/driverview" element={<DriverView userId={userId} logOut={logOut}/>} />
          <Route path="/ratings-reviews" element={<Reviews />} />
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/riderview" element={<RiderView userId={userId} riderOnGoingRoute={riderOnGoingRoute} logOut={logOut}/>} />
          <Route path="/driverprofile" element={<DriverProfile  />} />
          <Route path="/riderprofile" element={<RiderProfile logOut={logOut}/>} />
          <Route path="/driver-list" element={<DriverList updateRiderOnGoingRoute={updateRiderOnGoingRoute} logOut={logOut}/>} />
          <Route path="/rider-list" element={<DriverInteractions updateRiderOnGoingRoute={updateRiderOnGoingRoute} logOut={logOut}/>} />
          <Route path="/trip-complete-rider" element={<TripCompleteRider />} />
          <Route path="/trip-complete-driver" element={<TripCompleteDriver />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
