import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './driver-list-style.css'
import { useLocation } from 'react-router-dom'

import { BiArrowBack } from 'react-icons/bi';
import { TbRefresh } from "react-icons/tb";
import { MdLogout } from 'react-icons/md';


import DriverCard from './DriverCard.jsx'

const DriverList = (props) => {

  const [drivers, setDrivers] = useState([]);
  const [userRouteInfo, setUserRouteInfo] = useState({})

  const info = useLocation()
  const {route, userInfo} = info.state

  const findDrivers = () => {
    const rider = {
      _id: route._id,
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
    setUserRouteInfo(rider);
    return axios.post('/driver-list', rider)
      .then((res) => {
        console.log('Driver list: ', res.data)
        return setDrivers(res.data);
      })
      .catch((err) => console.log('Find drivers error: ', err))
  }

  useEffect(() => {findDrivers()}, [])
  useEffect(() => {findDrivers()}, [route])


  if (drivers.length > 0) {
    const favoritesDrivers = [];
    const nonFavoritesDrivers = [];
    for (let i = 0; i < drivers.length; i++) {
      if ((userInfo.favorites || []).includes(drivers[i].driverInfo._id)) {
        favoritesDrivers.push(drivers[i])
      } else {
        nonFavoritesDrivers.push(drivers[i])
      }
    }
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <p>Rider</p>
            <Link to="/driverview">
              <TbRefresh className='top-bar-icons' />
            </Link>
          </div>
          <div className='top-bar-right'>
            <Link to="/riderprofile">
              <img className='avatar' src={userInfo.avatar} alt="" />
            </Link>
            <Link to="/">
              <MdLogout className='top-bar-icons' />
            </Link>
          </div>
        </div>
        <div className='title-bar'>
          <Link to="/riderview">
            <BiArrowBack className='driver-list-back-icon' />
          </Link>
          <p>Your nearest drivers</p>
        </div>
        <div className='driver-list'>
          <p className='subheader-driver'>Favorite drivers</p>
          {favoritesDrivers.map((driver) => (
            <DriverCard
              key={driver.driverInfo._id}
              driverInfo={driver.driverInfo}
              userInfo={userInfo}
              route={route}
              userRouteInfo={userRouteInfo}
              startDistance={driver.startDistance}
              endDistance={driver.endDistance}
              updateRiderOnGoingRoute={props.updateRiderOnGoingRoute}
            />
          ))}
        </div>
        <div className='driver-list'>
          <p className='subheader-driver'>Non-favorite drivers</p>
          {nonFavoritesDrivers.map((driver) => (
            <DriverCard
              key={driver.driverInfo._id}
              driverInfo={driver.driverInfo}
              userInfo={userInfo}
              route={route}
              userRouteInfo={userRouteInfo}
              startDistance={driver.startDistance}
              endDistance={driver.endDistance}
              updateRiderOnGoingRoute={props.updateRiderOnGoingRoute}
            />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='loading-screen'>
        <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
        <p>Finding drivers...</p>
      </div>
    )
  }
}

export default DriverList;