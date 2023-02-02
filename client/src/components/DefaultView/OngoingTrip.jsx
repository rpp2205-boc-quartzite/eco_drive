import React from 'react';
import { Link } from 'react-router-dom';
import './ongoing-trip-style.css'

const OngoingTrip = () => {
  return (
    <div className="ongoing-trip-container">

      <p> Ongoing Trip </p>

      <div className="card">

        <div className="profile">
          <span>Profile Photo</span>
          <span>Name</span>
          <span>Heart</span>
          <span>Info</span>
        </div>

        <div className="detail"> Pickup </div>
        <div className="detail"> License Plate </div>
        <div className="detail"> Start Time </div>

        <div className="buttons">
          <button className="end-button">Cancel</button>
          <Link to='/trip-complete'>
            <button type='submit' className="end-button">End Trip</button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default OngoingTrip;