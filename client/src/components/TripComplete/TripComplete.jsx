import React from 'react';
import { Link } from 'react-router-dom';
import './trip-complete-style.css';

import Analytics from './Analytics.jsx';
import PassengerList from './PassengerList.jsx';


  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

// NEED:
// list of riders on the trip, who was the driver
// which user is the one logged in / clicked the button
// starting and ending address

const TripComplete = () => {
  return (
    <div className="trip-complete">
      <div className="defaultViewHeader">
        {/* <div className="headerAvatarLogout">
          <div className="headerAvatar">
            <Link to="/driverprofile">
            <button>Avatar</button>
            </Link> */}

          {/* <div className="headerLogout">
            <Link to="/">
            <MdLogout className="logout" size={20}/>
            </Link></div> */}
        {/* </div> */}
      </div>
      <h1>Trip Complete!</h1>
      <PassengerList/>
      <Analytics/>
      <Link to='/riderview'>
        <button>Back to Home</button>
      </Link>
    </div>
  )
}

export default TripComplete;