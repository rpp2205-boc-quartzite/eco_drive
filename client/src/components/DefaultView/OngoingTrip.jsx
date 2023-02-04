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

  const [value, setValue] = useState(0); // integer state

  // forceUpdate hook
  const forceUpdate = () => {
    setValue(value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here
    // is better than directly setting `setValue(value + 1)`
  }


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

        // rider route ongoing
        if (user.rider_route.started) {
          let driverId = user.rider_route.driver_id;
          axios.get('/getdriverview', { params: {userId: driverId}})
            .then(result => {
              console.log('THISONE')
              let driver = result.data[0];
              console.log('DRIVEERRRR2:', driver);
              setStarted(true);
              setAvatar(driver.avatar);  // driver avatar link
              setName(driver.full_name); // driver name
              setPickUp(user.rider_route.start_address); // trip start address
              setPlate(driver.license_plate); // driver license plate
              setTime(user.rider_route.time) // trip start time
            })
            .catch(err => {
              console.log('Failed');
            })

        // driver route ongoing
        } else if (user.driver_route.started) {
          console.log('THISONEHEREEE')
          setStarted(true);
          setAvatar(user.avatar);  // user avatar (user is driver)
          setName(user.full_name); // user name
          setPickUp(user.driver_route.start_address); // driver route start address
          setPlate(user.license_plate); // user's license plate
          setTime(user.driver_route.time) // trip start time
        }
      })
      .catch(err => console.log('ERR: ', err))
  }

  getUser(props.user)

  const endTrip = () => {
    console.log('USERRRR:', props.user);
    axios.put(`/end-trip/${props.user}`)
      .then(result => {
        console.log('RESULT:', result);
        forceUpdate();
      })
      .catch(err => {
        console.log('ERROR HERE:', err);
      })
  }

  if (started) {
    return (
        <div className="ongoing-trip-container">

          <div className="ongoing-title">Ongoing Trip</div>

          <div className="card">

            <div className="profile">
              <div >
                <img src={avatar} alt="avatar" className='profilePhoto'/>
              </div>
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