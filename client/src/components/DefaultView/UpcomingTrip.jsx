import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTrip = (props) => {

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

  // upcoming route as a rider
  const getDriver = async () => {
    if (!user.rider_route.started && user.rider_route.driver_id) {
      let driverId = user.rider_route.driver_id;
      let result = await axios.get('/getdriverview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
      result = result.data[0];
      setDriver(result);
    }
  }

  const startTrip = () => {
    console.log('started');
  }

  // upcoming route as a driver
  // user driver_route not started && user has a driver_route set
  if (user && !user.driver_route.started && user.driver_route.start_address) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Upcoming Trip</div>
        <div className="card">
          <div className="profile">
            <div>
              <img src={user.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span>{user.full_name}</span>
            <span>Heart</span>
            <span>Info</span>
          </div>
          <div className="detail"> {user.driver_route.start_address} </div>
          <div className="detail"> {user.license_plate} </div>
          <div className="detail"> {user.driver_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={startTrip} className="end-button" id="start-trip-button">Start Trip</button>
          </div>
        </div>
      </div>
    )
  // upcoming route as a rider
  // if the driver is set
  } else if (driver) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Upcoming Trip</div>
        <div className="card">
          <div className="profile">
            <div>
              <img src={driver.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span>{driver.full_name}</span>
            <span>Heart</span>
            <span>Info</span>
          </div>
          <div className="detail"> {user.rider_route.start_address} </div>
          <div className="detail"> {driver.license_plate} </div>
          <div className="detail"> {user.rider_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={startTrip} className="end-button" id="start-trip-button">Start Trip</button>
          </div>
        </div>
      </div>
    )
  // no upcoming routes
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