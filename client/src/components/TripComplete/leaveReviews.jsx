import React from 'react';
import { Link } from 'react-router-dom';
import './trip-complete-style.css'

const LeaveReviews = () => {
  return (
    <div>

      <p> Please leave reviews for the riders! </p>
      <div className="passenger">
        <span> Profile Photo </span>
        <span> Rider 1 </span>
        <Link to='/ratings_reviews'>
          <button type='submit' className="end-button">Review</button>
        </Link>
      </div>
      <div className="passenger">
        <span> Profile Photo </span>
        <span> Rider 1 </span>
        <Link to='/ratings_reviews'>
          <button type='submit' className="end-button">Review</button>
        </Link>
      </div>
      <div className="passenger">
        <span> Profile Photo </span>
        <span> Rider 1 </span>
        <Link to='/ratings_reviews'>
          <button type='submit' className="end-button">Review</button>
        </Link>
      </div>

    </div>
  )
}

export default LeaveReviews;