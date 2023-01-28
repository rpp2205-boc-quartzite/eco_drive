import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './driver-list-style.css'

import DriverCard from './DriverCard.jsx'

const DriverList = (props) => {

  const [drivers, setDrivers] = useState([]);

  const findDrivers = () => {
    // const rider = {
    //   id: props.userId,
    //   start_address: props.start_address,
    //   start_lat: props.start_lat,
    //   start_lng: props.start_lng,
    //   end_address: props.end_address,
    //   end_lat: props.end_lat,
    //   end_lng: props.end_lng,
    //   time: props.time,
    // }
    const rider = {
      id: "63d36e02cd478f26557c4a36",
      start_address: '169 S 15th St, San Jose, CA 95112',
      start_lat: 37.340170,
      start_lng: -121.874510,
      end_address: '665 S 10th St, San Jose, CA 95112',
      end_lat: 37.33063,
      end_lng: 	-121.87354,
      time: '9:00 am',
    }
    return axios.post('/driver-list', rider)
      .then((res) => {
        console.log(res.data)
        return setDrivers(res.data);
      })
      .catch((err) => console.log('Find drivers error: ', err))
  }

  useEffect(() => {findDrivers()}, [])


  if (drivers.length > 0) {
    return (
      <div>
        {drivers.map((driver) => (
          <DriverCard key={driver.driverInfo._id} driverInfo={driver.driverInfo} startDistance={driver.startDistance} endDistance={driver.endDistance} />
        ))}
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default DriverList;