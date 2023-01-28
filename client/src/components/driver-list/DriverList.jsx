import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './driver-list-style.css'

import DriverCard from './DriverCard.jsx'

const DriverList = (props) => {

  const driverList = [];

  const findDrivers = () => {
    const rider = {
      id: props.userId,
      start_address: props.start_address,
      start_lat: props.start_lat,
      start_lng: props.start_lng,
      end_address: props.end_address,
      end_lat: props.end_lat,
      end_lng: props.end_lng,
      time: props.time,
    }
    axios.post('/driver-list', rider)
      .then((res) => {

      })
  }
  

  return (
    <div>
      <DriverCard />
    </div>
  )

}

export default DriverList;