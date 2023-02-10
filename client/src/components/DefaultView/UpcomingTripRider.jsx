import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { RiHeart3Line, RiHeart3Fill, RiInformationLine } from "react-icons/ri";
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTripRider = (props) => {

  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.userId} }).catch(err => console.log('ERR: ', err))
      result = result.data[0];
      setUser(result);
      if (result) {
        let driverId = result.rider_route.driver_id;
        let driverInfo = await axios.get('/getriderview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
        driverInfo = driverInfo.data[0];
        setDriver(driverInfo);
      }
    }
    myFunc();
  }, [])

  const cancelRoute = async () => {
    await axios.put(`/cancel-rider-route/${props.userId}`).catch(err => console.log('ERR: ', err))
    setDriver(null);
    props.onChange(false);
  }

  if (user && driver) {
    return (
      <div className="ongoing-trip-container">
        <h5>Upcoming Trip</h5>
        <div className="driver-card">
          <div className="card-header">
            <div className='header-info'>
              <img src={driver.avatar} alt="avatar" className='avatar'/>
              <p>{driver.full_name}</p>
            </div>
            <div className='icons-flex'>
              {user.favorites.includes(driver._id)
                ? <RiHeart3Fill className='card-icon full-heart-icon'/>
                : (<RiHeart3Line className='card-icon outlined-heart-icon'/>)
              }
              <Link to="/ratings-reviews"  state={ {from: 'riderview', userData: user, revieweeData: driver } }>
                <RiInformationLine className='card-icon info-icon'/>
              </Link>
            </div>
          </div>
          <div className="trip-card-body">
            <div className="defaultRouteCardTitle title-margin">Pickup:</div>
            <div className='defaultRouteCardInfo detail-margin'>{driver.driver_route.start_address}</div>
            <div className="defaultRouteCardTitle title-margin">License plate #:</div>
            <div className='defaultRouteCardInfo detail-margin'>{driver.license_plate}</div>
            <div className="defaultRouteCardTitle title-margin">Time:</div>
            <div className='defaultRouteCardInfo detail-margin'>{driver.driver_route.time}</div>
          </div>
          <div className="btn-horizontal-flex">
            <Link to="/riderview" className="link link-wrap-btn">
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
        <div className="driver-card">
          <p className='not-found-text'>No upcoming routes</p>
        </div>
      </div>
    )
  }
}

export default UpcomingTripRider;