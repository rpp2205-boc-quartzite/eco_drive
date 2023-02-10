import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { RiHeart3Line, RiHeart3Fill, RiInformationLine } from "react-icons/ri";

const DriverCard = ({driverInfo, userInfo, userRouteInfo, route, startDistance, endDistance, updateRiderOnGoingRoute, toggleDriverConfirmation}) => {

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
      <div className='driver-card'>
        <div className='card-header'>
          <div className='header-info'>
            <img className='avatar' src={driverInfo.avatar} alt="Driver Avatar" />
            <p>{driverInfo.full_name}</p>
          </div>
          <div className='icons-flex'>
            {favoriteDriver
              ? <RiHeart3Fill className='card-icon full-heart-icon' onClick={() => {toggleFavoriteDriver()}}/>
              : <RiHeart3Line className='card-icon outlined-heart-icon' onClick={() => {toggleFavoriteDriver()}}/>
            }
            <Link to="/ratings-reviews" state={{userData: userInfo, revieweeData: driverInfo, from: 'driver-list', route: route, view: 'rider'}}>
              <RiInformationLine className='card-icon info-icon'/>
            </Link>
          </div>
        </div>
        <p>From: {startDistance.text} from your starting point</p>
        <p>To: {endDistance.text} from your destination</p>
        <p>Time: {driverInfo.driver_route.time} </p>
        <button className='secondary-btn' onClick={() => {toggleDriverConfirmation('on', driverInfo, userRouteInfo, startDistance, endDistance)}}>Select Driver</button>
      </div>
    </>
  )
}

export default DriverCard;