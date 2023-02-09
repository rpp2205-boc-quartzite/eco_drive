import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { RiInformationLine } from "react-icons/ri";
import axios from 'axios';
import './ongoing-trip-style.css';


const OngoingTripDriver = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.userId} }).catch(err => console.log('ERR: ', err))
      console.log('REUSULTT', result);
      result = result.data[0];
      setUser(result);
    }
    myFunc();
  }, [])

  const cancelRoute = async () => {
    await axios.put(`/cancel-driver-route/${props.userId}`).catch(err => console.log('ERR: ', err))
    setUser(null);
  }


  if (user) {
    return (
      <div className="ongoing-trip-container">
        <h5>Ongoing Trip</h5>
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
              <RiInformationLine className='card-icon info-icon'/>
            </Link>
          </div>
          <p className='card-detail'>Pickup: {user.driver_route.start_address}</p>
          <p className='card-detail'>License plate #: {user.license_plate}</p>
          <p className='card-detail'>Time: {user.driver_route.time}</p>
          <div className="btn-horizontal-flex">
            <Link to="/driverview">
              <button className="cancel-btn btn-flex-grow" onClick={cancelRoute}>Cancel</button>
            </Link>
            <Link to="/trip-complete-driver" state={{ user }}>
              <button type='submit' onClick={props.endTrip}className="negative-btn btn-flex-grow" id="end-trip-button">End Trip</button>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ongoing-trip-container">
        <h5>Ongoing Trip</h5>
        <div className="card">
          <p className='no-route-message'> No active routes </p>
        </div>
      </div>
    )
  }
}

export default OngoingTripDriver;