import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInfo } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import axios from 'axios';
import './ongoing-trip-style.css';


const OngoingTripDriver = (props) => {

  console.log('props info: ', props);

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


  if (user) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Ongoing Trip</div>
        <div className="trip-card">
          <div className="profile">
            <div>
              <img src={user.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span id="name">{user.full_name}</span>
            <div>
              <p> </p>
            </div>
            <Link to="/driverprofile">
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {user.driver_route.start_address} </div>
          <div className="detail"> {user.license_plate} </div>
          <div className="detail"> {user.driver_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            {/* <Link to="/trip-complete" state={{ user }}> */}
              <button type='submit' onClick={props.endTrip} className="end-button" id="end-trip-button">End Trip</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Ongoing Trip</div>
        <div className="card">
          <p> No Active Routes </p>
        </div>
      </div>
    )
  }
}

export default OngoingTripDriver;