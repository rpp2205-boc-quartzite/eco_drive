import React from 'react';
import { Link } from 'react-router-dom';

const PassengerCard = () => {
  return (
    <div className="passenger-card">
      <span> Photo </span>
      <span> Name </span>
      <span> Heart </span>
      <Link to='/ratings-reviews'>
        <span> Info </span>
      </Link>
    </div>
  )

}

export default PassengerCard;