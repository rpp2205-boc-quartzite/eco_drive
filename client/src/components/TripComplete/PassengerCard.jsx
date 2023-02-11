import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHeart3Line, RiHeart3Fill, RiInformationLine } from "react-icons/ri";
import axios from 'axios';

const PassengerCard = (props) => {

  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState(props.user.favorites.includes(props.pId));

  useEffect(() => {
    const myFunc = async () => {
      var pId = props.pId;
      if (props.pId._id) {
        console.log('Keanu', props.pId._id)
        pId = props.pId._id;
      }
      let result = await axios.get('/getdriverview',  { params: {userId: pId} }).catch(err => console.log(err));
      result = result.data[0];
      setUser(result);
    }
    myFunc();
  }, [])

  const addFavorite = async () => {
    await axios.put(`/favorite/${props.user._id}/${props.pId}`).catch(err => console.log(err));
    setFavorite(true);
    props.user.favorites.push(user._id);
    console.log('props.user.favorites', props.user.favorites);
  }

  const removeFavorite = async () => {
    await axios.put(`/unfavorite/${props.user._id}/${props.pId}`).catch(err => console.log(err));
    setFavorite(false);
    let newUserFavorites = props.user.favorites.filter(favorite => {
      return favorite !== user._id;
    });
    props.user.favorites = newUserFavorites;
    console.log('props.user.favorites', props.user.favorites);
  }


  if (user) {
    return (
      <div className="passenger-card">
        <div >
          <img src={user.avatar} alt="avatar" className='avatar'/>
        </div>
        <span id="username"> {user.full_name} </span>
        <div id="heart">
          {favorite
          ? <RiHeart3Fill className='card-icon full-heart-icon' onClick={removeFavorite}/>
          : <RiHeart3Line className='card-icon outlined-heart-icon' onClick={addFavorite}/>
          }
        </div>
          {
            props.view === 'driver'
            ?  <Link to="/ratings-reviews" state={ {from: 'trip-complete-driver', userData: props.user, revieweeData: user, view: props.view }}>
                <RiInformationLine className='card-icon info-icon'/>
              </Link>
            :  <Link to="/ratings-reviews" state={ {from: 'trip-complete-rider', userData: props.user, revieweeData: user, view: props.view }}>
                <RiInformationLine className='card-icon info-icon'/>
              </Link>
          }
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