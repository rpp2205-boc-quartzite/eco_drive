import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './driver-list-style.css'
import { useLocation } from 'react-router-dom'

import DriverCard from './DriverCard.jsx'

const DriverList = (props) => {

  const [drivers, setDrivers] = useState([]);

  const info = useLocation()
  const {route} = info.state

  const findDrivers = () => {
    console.log(route)
    const rider = {
      _id: route.userId,
      start_address: route.start_address,
      start_lat: route.start_lat,
      start_lng: route.start_lng,
      end_address: route.end_address,
      end_lat: route.end_lat,
      end_lng: route.end_lng,
      time: route.time,
      default: route.default
    }
    // const rider = {
    //   id: "63d36e02cd478f26557c4a36",
    //   start_address: '169 S 15th St, San Jose, CA 95112',
    //   start_lat: 37.340170,
    //   start_lng: -121.874510,
    //   end_address: '665 S 10th St, San Jose, CA 95112',
    //   end_lat: 37.33063,
    //   end_lng: 	-121.87354,
    //   time: '9:00 am',
    // }
    return axios.post('/driver-list', rider)
      .then((res) => {
        console.log(res.data)
        return setDrivers(res.data);
      })
      .catch((err) => console.log('Find drivers error: ', err))
  }

  useEffect(() => {findDrivers()}, [])
  useEffect(() => {findDrivers()}, [route])


  if (drivers.length > 0) {
    return (
      <div>
        {drivers.map((driver) => (
          <DriverCard
            key={driver.driverInfo._id}
            driverInfo={driver.driverInfo}
            startDistance={driver.startDistance}
            endDistance={driver.endDistance}
            updateRiderOnGoingRoute={props.updateRiderOnGoingRoute}
          />
        ))}
      </div>
    )
  } else {
    return (<div className='loading-screen'>
      <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
      <p>Please wait...</p>
    </div>)
  }
}

export default DriverList;