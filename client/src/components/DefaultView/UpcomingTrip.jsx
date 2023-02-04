import React, { useState } from 'react';
import axios from 'axios';
import './ongoing-trip-style.css';

const UpcomingTrip = (props) => {

  const [avatar, setAvatar] = useState('avatar');
  const [name, setName] = useState('name');
  const [pickup, setPickUp] = useState('pickup');
  const [plate, setPlate] = useState('plate');
  const [time, setTime] = useState('time');
  const [hasRoute, setRoute] = useState(false);


  // on component load, check user routes in DB

  const getUser = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {

        let user = result.data[0];
        // console.log('USSSSEERRR:', user);

        // rider route upcoming
        if (!user.rider_route.started && user.rider_route.driver_id) {
          let driverId = user.rider_route.driver_id;
          axios.get('/getdriverview', { params: {userId: driverId}})
            .then(result => {
              // console.log('NOHERE')
              let driver = result.data[0];
              // console.log('DRIVEERRRR:', driver);
              setRoute(true);
              setAvatar(driver.avatar);  // driver avatar link
              setName(driver.full_name); // driver name
              setPickUp(user.rider_route.start_address); // trip start address
              setPlate(driver.license_plate); // driver license plate
              setTime(user.rider_route.time) // trip start time
            })
            .catch(err => {
              console.log('Failed');
            })

        // driver route upcoming
        } else if (!user.driver_route.started && user.driver_route.riders.length > 0) {
          // console.log('THISONE')
          setRoute(true);
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

  const startTrip = () => {
    // console.log('USERRRR:', props.user);
    axios.put(`/start-trip/${props.user}`)
      .then(result => {
        console.log('RESULT:', result);
        setRoute(false);
      })
      .catch(err => {
        console.log('ERROR HERE:', err);
      })
  }

  if (hasRoute) {
    return (
      <div className="ongoing-trip-container">

        <div className="ongoing-title">Upcoming Trip</div>

        <div className="card">

          <div>
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