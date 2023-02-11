import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './trip-complete-style.css';

import AnalyticsRider from './AnalyticsRider.jsx';
import PassengerList from './PassengerList.jsx';


const TripCompleteRider = () => {

  const location = useLocation();
  const user = location.state.user;
  const driver = location.state.driver;

  return (
    <div className="trip-complete">
      <h1 className="title">Trip Complete!</h1>
      <PassengerList pIds={[driver._id]} user={user} view={'rider'}/>
      <AnalyticsRider distance={location.state.distance}/>
      <Link to='/riderview'>
        <button id="back-to-home">Back to Home</button>
      </Link>
    </div>
  )
}

export default TripCompleteRider;