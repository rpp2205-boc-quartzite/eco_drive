import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './driver-list-style.css'
import { useLocation } from 'react-router-dom'

import { BiArrowBack } from 'react-icons/bi';
import { RiRefreshLine, RiLogoutBoxRLine } from "react-icons/ri";


import DriverCard from './DriverCard.jsx'
import DriverConfirmation from './DriverConfirmation.jsx'
import BookingSuccessMessage from './BookingSuccessMessage.jsx'

const DriverList = (props) => {

  const [drivers, setDrivers] = useState(null);
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

  const [driverConfirmationOn, setDriverConfirmation] = useState(false);
  const [successMessageOn, setSuccessMessage] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});

  const toggleDriverConfirmation = (action, driverInfo, userRouteInfo, startDistance, endDistance) => {
    if (action==='on') {
      const confirmInfo = {driverInfo, userRouteInfo, startDistance, endDistance}
      setSelectedDriver(confirmInfo)
      setDriverConfirmation(!driverConfirmationOn)
    } else if (action==='off') {
      setSelectedDriver({})
      setDriverConfirmation(!driverConfirmationOn)
    }
  }

  const toggleSuccessMessage = () => {
    setSuccessMessage(!successMessageOn)
  }


  if (drivers !== null) {
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
        <>
          { successMessageOn && <BookingSuccessMessage /> }
          {
            driverConfirmationOn &&
            <DriverConfirmation
              driverInfo={selectedDriver.driverInfo}
              userRouteInfo={selectedDriver.userRouteInfo}
              startDistance={selectedDriver.startDistance}
              endDistance={selectedDriver.endDistance}
              toggleDriverConfirmation={toggleDriverConfirmation}
              toggleSuccessMessage={toggleSuccessMessage}
              updateRiderOnGoingRoute={props.updateRiderOnGoingRoute}
            />
          }
          <div className='component-container'>
            <div className='top-bar'>
              <div className='top-bar-left'>
                <p>Rider</p>
                <Link to="/driverview">
                  <RiRefreshLine className='top-bar-icons' />
                </Link>
              </div>
              <div className='top-bar-right'>
                <Link to="/riderprofile" state={{id: userRouteInfo._id, userInfo: userInfo, from: 'driver-list'}}>
                  <img className='avatar' src={userInfo.avatar} alt="" />
                </Link>
                <RiLogoutBoxRLine className='top-bar-icons' onClick={props.logOut}/>
              </div>
            </div>
            <div className='title-bar'>
              <Link to="/riderview">
                <BiArrowBack className='driver-list-back-icon' />
              </Link>
              <p>Your nearest drivers</p>
            </div>
            <div className='both-driver-lists'>
              {favoritesDrivers.length > 0
                ? <div className='driver-list'>
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
                        toggleDriverConfirmation={toggleDriverConfirmation}
                      />
                    ))}
                  </div>
                : <div className='driver-list'>
                    <p className='subheader-driver'>Favorite drivers</p>
                    <p className='not-found-text'>No favorite drivers found</p>
                  </div>
              }
              {nonFavoritesDrivers.length > 0
                ? <div className='driver-list'>
                    <p className='subheader-driver'>Drivers</p>
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
                        toggleDriverConfirmation={toggleDriverConfirmation}
                      />
                    ))}
                  </div>
                : <div className='driver-list'>
                    <p className='subheader-driver'>Drivers</p>
                    <p className='not-found-text'>No drivers found</p>
                  </div>
              }
            </div>
          </div>
        </>
      )
    } else {
      return (
        <div className='loading-screen'>
          <div className='no-driver-top'>
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
          </div>
          <img className='loading-gif' src="https://uploads-ssl.webflow.com/5eea00f42c5f66e46d83aa23/5f36a54aa224a34042f8d88f_sad.gif" alt="No drivers" />
          <p>No driver is active</p>
        </div>
      )
    }
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