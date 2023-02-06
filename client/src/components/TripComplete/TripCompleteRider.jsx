import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './trip-complete-style.css';

import Analytics from './Analytics.jsx';
import PassengerList from './PassengerList.jsx';


const TripCompleteRider = () => {

  const location = useLocation();
  const user = location.state.user;
  const driver = location.state.driver;
  const passengerIds = [driver._id];
  driver.driver_route.riders.forEach((rider) => {
    if (rider.rider_id && !passengerIds.includes(rider.rider_id) && rider.rider_id !== user._id) {
      passengerIds.push(rider.rider_id)
    }
  })

  return (
    <div className="trip-complete">
      <h1 className="title">Trip Complete!</h1>
      <PassengerList pIds={passengerIds} user={user}/>
      <Analytics/>
      <Link to='/riderview'>
        <button id="back-to-home">Back to Home</button>
      </Link>
    </div>
  )
}

export default TripCompleteRider;