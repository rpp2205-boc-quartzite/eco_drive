import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInfo } from "react-icons/fi";
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTripDriver = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.userId} }).catch(err => console.log('ERR: ', err))
      result = result.data[0];
      setUser(result);
    }
    myFunc();
  }, [])

  // upcoming route as a driver
  if (user && user.driver_route.start_address !== undefined) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Upcoming Trip</div>
        <div className="trip-card">
          <div className="profile">
            <div>
              <img src={user.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span id="name">{user.full_name}</span>
            <div>
              <p> </p>
            </div>
            <Link to="/driverprofile" state={ {from:'driverview', user}}>
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {user.driver_route.start_address} </div>
          <div className="detail"> {user.license_plate} </div>
          <div className="detail"> {user.driver_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={props.startTrip} className="end-button" id="start-trip-button">Start Trip</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Upcoming Trip</div>
        <div className="card">
          <p> No Upcoming Routes </p>
        </div>
      </div>
    )
  }
}

export default UpcomingTripDriver;