import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './trip-complete-style.css';

import Analytics from './Analytics.jsx';
import PassengerList from './PassengerList.jsx';


const TripComplete = () => {

  // const location = useLocation();
  // const { user } = location.state

  return (
    <div className="trip-complete">
      <h1 className="title">Trip Complete!</h1>
      <PassengerList/>
      <Analytics/>
      <Link to='/riderview'>
        <button id="back-to-home">Back to Home</button>
      </Link>
    </div>
  )
}

export default TripComplete;