import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInfo } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import axios from 'axios';
import './ongoing-trip-style.css';


const OngoingTrip = (props) => {

  const [user, setUser] = useState(null);
  const [driver,setDriver] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      await getUser(props.user);
      await getDriver();
    }
    myFunc();
  }, [props]);

  const getUser = async (userId) => {
    let result = await axios.get('/getdriverview',  { params: {userId} }).catch(err => console.log('ERR: ', err))
    result = result.data[0];
    setUser(result);
  }

  // ongoing route as a rider
  const getDriver = async () => {
    if (user && user.rider_route.started && user.rider_route.driver_id) {
      let driverId = user.rider_route.driver_id;
      let result = await axios.get('/getdriverview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
      result = result.data[0];
      setDriver(result);
    }
  }

  // end trip
  const endTrip = async () => {
    console.log('before', user);
    let route = (user.driver_route.started? 'driver': 'rider')
    let result = await axios.put(`/end-trip/${user._id}/${route}`).catch(err => console.log('ERROR:', err))
    console.log('after', user);
  }


  // user driver_route started
  if (user && user.driver_route.started) {
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
            <Link to="/ratings-reviews">
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {user.driver_route.start_address} </div>
          <div className="detail"> {user.license_plate} </div>
          <div className="detail"> {user.driver_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={endTrip} className="end-button" id="end-trip-button">End Trip</button>
          </div>
        </div>
      </div>
    )
  // ongoing route as a rider
  // if the driver is set
  } else if (driver) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Ongoing Trip</div>
        <div className="trip-card">
          <div className="profile">
            <div>
              <img src={driver.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span id="name">{driver.full_name}</span>
            <div>
              {driver.favorites.includes(user._id)
                ? <HiHeart className='card-icon full-heart-icon'/>
                : <HiOutlineHeart className='card-icon outlined-heart-icon'/>
              }
            </div>
            <Link to="/ratings-reviews">
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {user.rider_route.start_address} </div>
          <div className="detail"> {driver.license_plate} </div>
          <div className="detail"> {user.rider_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={endTrip} className="end-button" id="end-trip-button">End Trip</button>
          </div>
        </div>
      </div>
    )
  // no upcoming routes
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

export default OngoingTrip;