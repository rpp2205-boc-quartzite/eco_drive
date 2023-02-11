import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './trip-complete-style.css';

import AnalyticsDriver from './AnalyticsDriver.jsx';
import PassengerList from './PassengerList.jsx';


const TripCompleteDriver = () => {

  const location = useLocation();
  const user = location.state.user;
  const passengerIds = [];
  user.driver_route.riders.forEach((rider) => {
    if (rider.rider_id && !passengerIds.includes(rider.rider_id)) {
      passengerIds.push(rider.rider_id);
    }
  })

  console.log(location.state.distance);

  return (
    <div className="trip-complete">
      <h1 className="title">Trip Complete!</h1>
      <PassengerList pIds={passengerIds} user={user} view={'driver'}/>
      <AnalyticsDriver distance={location.state.distance}/>
      <Link to='/riderview'>
        <button id="back-to-home">Back to Home</button>
      </Link>
    </div>
  )
}

export default TripCompleteDriver;