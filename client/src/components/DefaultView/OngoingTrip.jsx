import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ongoing-trip-style.css';

const OngoingTrip = (props) => {

  const [avatar, setAvatar] = useState('avatar');
  const [name, setName] = useState('name');
  const [pickup, setPickUp] = useState('pickup');
  const [plate, setPlate] = useState('plate');
  const [time, setTime] = useState('time');
  const [started, setStarted] = useState(false);


  const getUser = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {
        // console.log('RESULTT: ', result)
        let user = result.data[0]; // set the user object
        // if the route is marked "started" set it
        if (user.driver_route.started) {
          setStarted(true);
          setAvatar('avatar'); // user avatar
          setName(user.full_name);
          setPickUp('1234 My Lane') // user.rider_route address (or driver)
          setPlate(user.license_plate);
          setTime('6:00 PM') // user.rider_route time (or driver)
        }
      })
      .catch(err => console.log('ERR: ', err))
  }

  getUser(props.user)

  const endTrip = () => {
    console.log('Ended!');
  }

  if (!started) {
    return (
        <div className="ongoing-trip-container">

          <div className="ongoing-title">Ongoing Trip</div>

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
                <button type='submit' onClick={endTrip} className="end-button" id="end-trip-button">End Trip</button>
              </Link>
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

export default OngoingTrip;