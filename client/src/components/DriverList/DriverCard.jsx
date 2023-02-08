import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FiInfo } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

import DriverConfirmation from './DriverConfirmation.jsx'
import BookingSuccessMessage from './BookingSuccessMessage.jsx'

const DriverCard = ({driverInfo, userInfo, userRouteInfo, route, startDistance, endDistance, updateRiderOnGoingRoute}) => {

  const [driverConfirmationOn, setDriverConfirmation] = useState(false);
  const [successMessageOn, setSuccessMessage] = useState(false);

  const toggleDriverConfirmation = () => {
    setDriverConfirmation(!driverConfirmationOn)
  }

  const toggleSuccessMessage = () => {
    setSuccessMessage(!successMessageOn)
  }

  const [favoriteDriver, setFavoriteDriver] = useState((userInfo.favorites || []).includes(driverInfo._id))

  const toggleFavoriteDriver = () => {
    if (favoriteDriver) {
      removeDriverOffFavorites()
        .then(() => {
          setFavoriteDriver(!favoriteDriver)
          let newUserFavorites = userInfo.favorites.filter(favorite => {
            return favorite !== driverInfo._id;
          });
          userInfo.favorites = newUserFavorites;
          console.log('Successfully unfavorite driver ', driverInfo.full_name)
        })
        .catch(() => console.log('Unable to unfavorite driver'))
    } else {
      addDriverToFavorites()
        .then(() => {
          setFavoriteDriver(!favoriteDriver)
          userInfo.favorites.push(driverInfo._id);
          console.log('Successfully favorite driver ', driverInfo.full_name)
        })
        .catch(() => console.log('Unable to favorite driver'))
    }

  }

  const addDriverToFavorites = () => {
    return axios.put(`/driver-list/?action=add-favorite&driverId=${driverInfo._id}&userId=${userRouteInfo._id}`, {});
  }

  const removeDriverOffFavorites = () => {
    return axios.put(`/driver-list/?action=remove-favorite&driverId=${driverInfo._id}&userId=${userRouteInfo._id}`, {});
  }

  return (
    <>
      { successMessageOn && <BookingSuccessMessage /> }
      {
        driverConfirmationOn &&
        <DriverConfirmation
          driverInfo={driverInfo}
          userRouteInfo={userRouteInfo}
          startDistance={startDistance}
          endDistance={endDistance}
          toggleDriverConfirmation={toggleDriverConfirmation}
          toggleSuccessMessage={toggleSuccessMessage}
          updateRiderOnGoingRoute={updateRiderOnGoingRoute}
        />
      }
      <div className='card'>
        <div className='card-header'>
          <div className='header-info'>
            <img className='avatar' src={driverInfo.avatar} alt="Driver Avatar" />
            <p>{driverInfo.full_name}</p>
          </div>
          <div className='icons-flex'>
            {favoriteDriver
              ? <HiHeart className='card-icon full-heart-icon' onClick={() => {toggleFavoriteDriver()}}/>
              : <HiOutlineHeart className='card-icon outlined-heart-icon' onClick={() => {toggleFavoriteDriver()}}/>
            }
            {/* <Link to="/ratings-reviews" state={{userData: userInfo, revieweeData: driverInfo, from: 'driver-list'}}></Link> */}
            <Link to="/ratings-reviews" state={{userData: userInfo, revieweeData: driverInfo, from: 'driver-list', route: route, view: 'rider'}}>
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
        </div>
        <p>From: {startDistance.text} from your starting point</p>
        <p>To: {endDistance.text} from your destination</p>
        <p>Time: {driverInfo.driver_route.time} </p>
        <button className='secondary-btn' onClick={() => {toggleDriverConfirmation()}}>Select Driver</button>
      </div>
    </>
  )
}

export default DriverCard;