import React from 'react';
import { Link } from 'react-router-dom';
import './ongoing-trip-style.css'

const OngoingTrip = () => {
  return (
    <div>
      <div className="profile">
        <span>Profile Photo</span>
        <span>Name</span>
      </div>
      <div> Pickup </div>
      <div> License Plate </div>
      <div> Start Time </div>
      <div className="end">
        <button className="end-button">Cancel</button>
        <Link to='/trip-complete'>
          <button type='submit' className="end-button">End Trip</button>
        </Link>
      </div>
    </div>
  )
}

export default OngoingTrip;