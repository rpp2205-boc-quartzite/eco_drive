import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTrip = (props) => {

  const [avatar, setAvatar] = useState('avatar');
  const [name, setName] = useState('name');
  const [pickup, setPickUp] = useState('pickup');
  const [plate, setPlate] = useState('plate');
  const [time, setTime] = useState('time');
  const [hasRoute, setRoute] = useState(false);

  console.log('Route: ', props);


  const getUser = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {
        // console.log('RESULTT: ', result)
        let user = result.data[0];
        // if the driver route is NOT started && has passengers, show it in upcoming
        if (!user.driver_route.started && user.driver_route.riders.length > 0) {
          setRoute(true);
          setAvatar('avatar');  // user avatar
          setName(user.full_name);
          setPickUp('pickup') // user.rider_route address (or driver)
          setPlate(user.license_plate);
          setTime('time') // user.rider_route time (or driver)
        }
      })
      .catch(err => console.log('ERR: ', err))
  }

  getUser(props.user)

  const startTrip = () => {
    console.log('started!');
  }

  if (!hasRoute) {
    return (
      <div className="ongoing-trip-container">

        <div className="ongoing-title">Upcoming Trip</div>

        <div className="card">

          <div className="profile">
            <span>{avatar}</span>
            <span>{name}</span>
            <span>Heart</span>
            <span>Info</span>
          </div>

          <div className="detail"> {pickup} </div>
          <div className="detail"> {plate} </div>
          <div className="detail"> {time} </div>

          <div className="buttons">
            <button className="end-button">Cancel</button>
            <button type='submit' onClick={startTrip} className="end-button" id="start-trip-button">Start Trip</button>
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