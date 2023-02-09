import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { RiInformationLine } from "react-icons/ri";
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

  const cancelRoute = async () => {
    await axios.put(`/cancel-driver-route/${props.userId}`).catch(err => console.log('ERR: ', err))
    setUser(null);
    props.onChange(false);
  }

  // upcoming route as a driver
  if (user && user.driver_route.start_address !== undefined) {
    return (
      <div className="ongoing-trip-container">
        <h5>Upcoming Trip</h5>
        <div className="card">
          <div className="card-header">
            <div className='header-info'>
              <img src={user.avatar} alt="avatar" className='avatar'/>
              <p>{user.full_name}</p>
            </div>
            <div className='icons-flex'>
              <Link to="/driverprofile" state={ {from:'driverview', user}}>
                <RiInformationLine className='card-icon info-icon'/>
              </Link>
            </div>
          </div>
          <p className='card-detail'>Pickup: {user.driver_route.start_address}</p>
          <p className='card-detail'>License plate #: {user.license_plate}</p>
          <p className='card-detail'>Time: {user.driver_route.time} </p>
          <div className="btn-horizontal-flex">
            <Link to="/driverview" className="link link-wrap-btn">
              <button className="cancel-btn" onClick={cancelRoute}>Cancel</button>
            </Link>
            <button type='submit' onClick={props.startTrip} className="primary-btn btn-flex-grow">Start Trip</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ongoing-trip-container">
        <h5>Upcoming Trip</h5>
        <div className="card">
          <p className='no-route-message'> No upcoming routes </p>
        </div>
      </div>
    )
  }
}

export default UpcomingTripDriver;