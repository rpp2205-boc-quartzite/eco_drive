import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import axios from 'axios';

const PassengerCard = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.pId} }).catch(err => console.log(err));
      result = result.data[0];
      setUser(result);
    }
    myFunc();
  }, [])

  if (user) {
    return (
      <div className="passenger-card">
        <div >
          <img src={user.avatar} alt="avatar" className='profilePhoto'/>
        </div>
        <span id="name"> {user.full_name} </span>
        <div id="heart">
          {props.user.favorites.includes(props.pId)
          ? <HiHeart className='card-icon full-heart-icon'/>
          : <HiOutlineHeart className='card-icon outlined-heart-icon'/>
          }
        </div>
        <Link to="/ratings-reviews">
          <FiInfo className='card-icon info-icon'/>
        </Link>
        <div id="name">
          report
        </div>
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