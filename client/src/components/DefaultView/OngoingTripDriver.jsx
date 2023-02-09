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
        <div className="card">
          <div className="card-header-driver">
          <div className='icons-flex'>
              {user.driver_route.riders.map(rider => {
                return (
                <Link to="/ratings-reviews" state={ {from: 'driverview', userData: user, reviewee_id: rider.rider_id} } key={rider.rider_id}>
                  <img src={rider.avatar} alt="avatar" className='avatar'/>
                </Link>
                )
              })}
            </div>
            <div>
              {user.driver_route.riders.length} / {user.driver_route.total_seats}
            </div>
          </div>
          <p className='card-detail'>Pickup: {user.driver_route.start_address}</p>
          <p className='card-detail'>License plate #: {user.license_plate}</p>
          <p className='card-detail'>Time: {user.driver_route.time}</p>
          <div className="btn-horizontal-flex">
            <Link to="/driverview" className="link link-wrap-btn">
              <button className="cancel-btn" onClick={cancelRoute}>Cancel</button>
            </Link>
            <Link to="/trip-complete-driver" className="link link-wrap-btn" state={{ user }}>
              <button type='submit' onClick={props.endTrip}  className="negative-btn">End Trip</button>
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