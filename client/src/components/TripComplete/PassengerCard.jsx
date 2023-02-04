import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PassengerCard = (props) => {

  const [avatarLink, setAvatarLink] = useState('foto');
  const [name, setName] = useState('myname');

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

  getUser(props.pId)

  return (
    <div className="passenger-card">
      <div >
        <img src={avatarLink} alt="avatar" className='profilePhoto'/>
      </div>
      <span> {name} </span>
      <span> Heart </span>
      <Link to='/ratings_reviews' state={props.pId}>
        <span> Info </span>
      </Link>
    </div>
  )

}

export default PassengerCard;