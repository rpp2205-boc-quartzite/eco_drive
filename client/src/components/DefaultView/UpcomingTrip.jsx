import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInfo } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTrip = (props) => {

  console.log('component called');

  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);

  // const [upcomingRoute, setUpcomingRoute] = useState(false);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.userId} }).catch(err => console.log('ERR: ', err))
      console.log('REUSULTT Up', result);
      result = result.data[0];
      setUser(result);
      let driverId = result.rider_route.driver_id;
      let driverInfo = await axios.get('/getriderview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
      console.log('REUSULTT2222 Up', driverInfo);
      driverInfo = driverInfo.data[0];
      setDriver(driverInfo);
    }
    myFunc();
  }, [])




  // upcoming route as a driver
  // user driver_route not started && user has a driver_route set
  if (user && driver) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Upcoming Trip</div>
        <div className="trip-card">
          <div className="profile">
            <div>
              <img src={driver.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span id="name">{driver.full_name}</span>
            <div>
              {user.favorites.includes(driver._id)
                ? <HiHeart className='card-icon full-heart-icon'/>
                : (<p> </p>)
              }
            </div>
            <Link to="/ratings-reviews">
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {driver.driver_route.start_address} </div>
          <div className="detail"> {driver.license_plate} </div>
          <div className="detail"> {driver.driver_route.time} </div>
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

export default UpcomingTrip;