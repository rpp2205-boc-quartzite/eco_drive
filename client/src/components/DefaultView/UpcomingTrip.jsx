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


  const getUser = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {
        console.log('RESULTT: ', result)
        let user = result.data[0];
        setAvatar('ava');
        setName(user.full_name);
        setPickUp('pickup') // user.rider_route address (or driver)
        setPlate(user.license_plate);
        setTime('time') // user.rider_route time (or driver)
      })
      .catch(err => console.log('ERR: ', err))
  }

  getUser(props.user)

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
            <Link to='/trip-complete'>
              <button type='submit' className="end-button">Start Trip</button>
            </Link>
          </div>

        </div>
      </div>
  )
}

export default UpcomingTrip;