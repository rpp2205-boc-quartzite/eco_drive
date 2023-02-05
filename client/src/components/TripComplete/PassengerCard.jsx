import React from 'react';
import { Link } from 'react-router-dom';
import { FiInfo } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import axios from 'axios';

const PassengerCard = (props) => {

  // const [avatarLink, setAvatarLink] = useState('foto');
  // const [name, setName] = useState('myname');

  const getUser = (userId) => {
    axios.get('/getdriverview',  { params: {userId} })
      .then(result => {
        console.log('RESULTT: ', result)
        let user = result.data[0]; // set the user object
        setAvatarLink(user.avatar);
        setName(user.full_name);

      })
      .catch(err => console.log('ERRRORR', err))
  }

  // getUser(props.pId)

  return (
    <div className="passenger-card">
      <div >
        {/* <img src={avatarLink} alt="avatar" className='profilePhoto'/> */}
        avatar
      </div>
      <span id="name"> name </span>
      <HiHeart className='card-icon full-heart-icon'/>
      <Link to="/ratings-reviews">
        <FiInfo className='card-icon info-icon'/>
      </Link>
    </div>
  )

}

export default PassengerCard;