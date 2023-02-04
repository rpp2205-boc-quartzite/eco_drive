/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal.jsx';
import ReviewTile from './ReviewTile.jsx';
import OverallRating from './OverallRating.jsx';
import { FaPen } from 'react-icons/fa';
import AllReviews from './AllReviews.jsx';
import { useLocation } from 'react-router-dom'
import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
// const { addFavorite, removeFavorite } = require('../database/controllers/driverList.js');
//const { addFavorite, removeFavorite } = require('../../../../database/controllers/driverList.js');

export default function Reviews(props) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reported, setReported] = useState(false);
  const [allDriverReviews, setAllDriverReviews] = useState(false);
  const [allRiderReviews, setAllRiderReviews] = useState(false);
  const location = useLocation();
  const [values, setValues] = useState({
    userId: null,
    name: '',
    avatar: null,
    riderReviews: [],
    driverReviews: [],
    driverSortedReviews: [],
    riderSortedReviews: [],
    driversLicense: '',
    favorited: false,
  });

  // console.log('testing .env', process.env.GOOGLE_MAP_API_KEY_RIDER_LIST);
  console.log('props', props);
  console.log('location.state', location.state);

  useEffect(() => {
    var id = '63d36e8fcd478f26557c4a37';
      axios.get('/getreviews', { params: {id} })
      .then((result) => {
        console.log('reviews result', result);
        setValues((values) => ({
          ...values,
          userId: result.data[0]._id,
          name: result.data[0].full_name,
          avatar: result.data[0].avatar,
          riderReviews: result.data[0].rider_reviews,
          driverReviews: result.data[0].driver_reviews,
          driversLicense: result.data[0].drivers_license
        }));
      })
      .catch(err => console.log(err))
    //document.title = `You clicked ${count} times`;
  }, [submitted]);

  const sort = () => {
    values.riderReviews.forEach(review => {
      let timestamp = review._id.toString().substring(0, 8);
      let date = new Date( parseInt( timestamp, 16 ) * 1000 );
      let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
      review.date = myDate;
    });
    values.sortedRiderReviews = values.riderReviews.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
    values.driverReviews.forEach(review => {
      let timestamp = review._id.toString().substring(0, 8);
      let date = new Date( parseInt( timestamp, 16 ) * 1000 );
      let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
      review.date = myDate;
    });
    values.sortedDriverReviews = values.driverReviews.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  const favorite = () => {
    console.log('favorite - test');

    if (!values.favorited) {
      setValues((values) => ({
        ...values,
        favorited: true
      }));
    } else {
      setValues((values) => ({
        ...values,
        favorited: false
      }));
    }
    // if (!values.favorited) {
    //   addFavorite(userId, driverId);
    // } else {
    //   removeFavorite(userId, driverId);
    // }
  }

  const calculateRating = () => {
    let count = 0;
    let sum = 0;
    let result = 0;
    values.riderReviews.forEach(review => {
      console.log('review', review);
      count++;
      sum += review.rating;
    })
    values.driverReviews.forEach(review => {
      console.log('review', review);
      count++;
      sum += review.rating;
    })
    result = sum/count;
    return result;
  }

  if (allDriverReviews || allRiderReviews) {
    if (allDriverReviews) {
      return (
        <AllReviews className='all-driver-reviews' />
      )
    } else {
      return (
        <AllReviews className='all-rider-reviews' />
      )
    }
  }

  if (values.name.length > 0) {
    sort();
    console.log('driver reviews: ', values.driverReviews);
    console.log('submitted: ', submitted);
    return (
      <div>
        <div className="reviewHeader">
          <div className="reviewHeaderBackButton">
            <Link to="/driverprofile">
              <BiArrowBack className="backButton" size={20} />
            </Link>
          </div>
          <div className="reviewHeaderLogout">
            <Link to="/">
              <MdLogout className="logout" size={20} />
            </Link>
          </div>
          <div className="reviewHeaderHome">
            <Link to="/driverview">
              <AiFillHome size={20} />
            </Link>
          </div>
        </div>
        <div className="reviewFavorite">
          {
            values.favorited
            ? <AiFillHeart className="unfavorite" color="red" size={25} onClick={favorite} />
            : <AiOutlineHeart className="favorite" size={25} onClick={favorite} />
          }
        </div>
        <div className="profilePhotoDiv">
          <img className="review-photo" alt="" src={values.avatar}/>
        </div>
        <div className="profileName">{values.name}
          <span className='profileOnline'>&#183;</span>
        </div>
        <div className="poi-overall-rating">
          <OverallRating rating={calculateRating()}/>
        </div>
        <div className='writeReviewButton'>
          <button
            disabled={submitted === true}
            className='btn-write-review'
            onClick={() =>
              {
                setReported(false);
                setShowModal(true);
              }
            }
          >
            Write Your Review
            <FaPen size="10px" color="green" />
          </button>
        </div>
        <div className='reportButton'>
          <button
            disabled={submitted === true}
            className='btn-report-review'
            onClick={() =>
              {
                setShowModal(true);
                setReported(true);
              }
            }
          >
            Report this Driver
          </button>
        </div>
        <div className='profileReviewDiv'>
          <span className='profileTitle'>Reviews from Drivers</span>
          <Link className="btn-select-all-reviews" state={{ text: "all-driver-reviews" }} to="/all-reviews">See All</Link>
          {/* <button className="btn-select-all-reviews" onClick={() => setAllDriverReviews(true)}>See All</button> */}
          <div className='profileReviewContainer'>
            {values.sortedDriverReviews.slice(0, 6).map(review => {
              return (
                <ReviewTile className='' review={review} key={review._id} />
              )
            })}
          </div>
        </div>
        <div className='profileReviewDiv'>
          <span className='profileTitle'>Reviews from Riders</span>
          <Link className="btn-select-all-reviews" state={{ text: "all-rider-reviews" }} to="/all-reviews">See All</Link>
          {/* <button className="btn-select-all-reviews" onClick={() => setAllRiderReviews(true)}>See All</button> */}
          <div className='profileReviewContainer'>
            {values.sortedRiderReviews.slice(0, 6).map(review => {
              return (
                <ReviewTile className='' review={review} key={review._id}/>
              )
            })}
          </div>
        </div>
        <ReviewModal show={showModal} reported={reported} userid={values.userId} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

{/* <span className='profileHomeButton'></span> */}