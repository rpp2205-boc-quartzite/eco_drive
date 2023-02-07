import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import axios from 'axios';

const PassengerCard = (props) => {

  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState(props.user.favorites.includes(props.pId));

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.pId} }).catch(err => console.log(err));
      result = result.data[0];
      setUser(result);
    }
    myFunc();
  }, [])

  const addFavorite = async () => {
    await axios.put(`/favorite/${props.user._id}/${props.pId}`).catch(err => console.log(err));
    setFavorite(true);
  }

  const removeFavorite = async () => {
    await axios.put(`/unfavorite/${props.user._id}/${props.pId}`).catch(err => console.log(err));
    setFavorite(false);
  }


  if (user) {
    return (
      <div className="passenger-card">
        <div >
          <img src={user.avatar} alt="avatar" className='profilePhoto'/>
        </div>
        <span id="name"> {user.full_name} </span>
        <div id="heart">
          {favorite
          ? <HiHeart className='card-icon full-heart-icon' onClick={removeFavorite}/>
          : <HiOutlineHeart className='card-icon outlined-heart-icon' onClick={addFavorite}/>
          }
        </div>
        <Link to="/ratings-reviews" state={ {from: 'trip-complete-rider', userData: props.user, revieweeData: user }}>
          <FiInfo className='card-icon info-icon'/>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="passenger-card">
        Loading
      </div>
    )
  }

}

export default PassengerCard;