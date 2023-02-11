import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi';
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
            <div className='card-header-driver-left'>
              {user.driver_route.riders.length === 0
                ? (<div className="no-riders">Ride Alone</div>)
                : (
                  <ul className='avatars'>
                    {user.driver_route.riders.map(rider => {
                      return (
                        <li className="avatar-li" key={rider.rider_id._id}>
                          <Link to="/ratings-reviews" state={ {from: 'driverview', userData: user, revieweeData: rider.rider_id, view: 'driver'} }>
                            <img src={rider.rider_id.avatar} alt="avatar" className='avatar avatar-item'/>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )
              }
            </div>
            <div className='card-header-driver-right'>
              <p className="trip-capacity">{user.driver_route.riders.length} / {user.driver_route.total_seats}</p>
              <Link to="/rider-list" state={{dir: props.passedMapData, route: props.passedRoute, userInfo: props.passedUserInfo}}>
                <HiArrowNarrowRight className='driver-list-forward-icon' />
              </Link>
            </div>
          </div>
          <div className="trip-card-body">
            <div className="defaultRouteCardTitle title-margin">Pickup:</div>
            <div className='defaultRouteCardInfo detail-margin'>{user.driver_route.start_address}</div>
            <div className="defaultRouteCardTitle title-margin">Drop Off:</div>
            <div className='defaultRouteCardInfo detail-margin'>{user.driver_route.end_address}</div>
            <div className="defaultRouteCardTitle title-margin">Time:</div>
            <div className='defaultRouteCardInfo detail-margin'>{user.driver_route.time}</div>
          </div>
          <div className="btn-horizontal-flex">
            <Link to="/driverview" className="link link-wrap-btn">
              <button className="cancel-btn" onClick={cancelRoute}>Cancel</button>
            </Link>
            <Link to="/trip-complete-driver" className="link link-wrap-btn" state={{ user, distance: props.distance }}>
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
        <div className="driver-card">
          <p className='not-found-text'> No active routes </p>
        </div>
      </div>
    )
  }
}

export default OngoingTripDriver;