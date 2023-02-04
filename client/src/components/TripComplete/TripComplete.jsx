import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import './trip-complete-style.css';

import Analytics from './Analytics.jsx';
import PassengerList from './PassengerList.jsx';


  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

// NEED:
// list of riders on the trip, who was the driver
// which user is the one logged in / clicked the button
// starting and ending address

// props: driver_id, riders

const TripComplete = () => {

  const location = useLocation()
  const userId = location.state.user;
  const isDriver = location.state.isDriver;
  const [passengers, setPassengers] = useState([]);


  const getPassengers = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {
        // console.log('RESULTT: ', result)
        let user = result.data[0]; // set the user object

        if (isDriver) {
          setPassengers(user.driver_trips[user.driver_trips.length - 1].riders);
        } else {
          axios.get('/getdriverview',  { params: {userId: user.rider_trips[user.rider_trips.length - 1].driver_id} })
            .then(result => {
              let driver = result.data[0]; // set the user object
              setPassengers(driver.driver_trips[driver.driver_trips.length - 1].riders);
            })
            .catch(err => console.log('Error here:', err))
        }
        })
        .catch(err => console.log('ERROr gettign user:', err))
  }


  getPassengers(userId)


  return (
    <div className="trip-complete">
      <h1 className="title">Trip Complete!</h1>
      <PassengerList passsengers={passengers}/>
      <Analytics/>
      <Link to='/riderview'>
        <button>Back to Home</button>
      </Link>
    </div>
  )
}

export default TripComplete;