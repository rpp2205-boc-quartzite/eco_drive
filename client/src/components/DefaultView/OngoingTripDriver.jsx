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
        <h5>Ongoing Trip</h5>
        <div className="card">
          <p className='no-route-message'> No Active Routes </p>
        </div>
      </div>
    )
  }
}

export default OngoingTripDriver;