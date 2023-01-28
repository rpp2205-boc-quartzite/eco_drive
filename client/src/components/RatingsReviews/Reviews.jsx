/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal.jsx';
import ReviewTile from './ReviewTile.jsx';
import FiveStars from './FiveStars.jsx';

export default function Reviews(props) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: '',
    avatar: null,
    riderReviews: [],
    driverReviews: [],
    rating: null,
  });
  let id = '63d36e8fcd478f26557c4a37';

  useEffect(() => {
    var id = '63d36e8fcd478f26557c4a37';
    axios.get('/ratings_reviews', { params: {id} })
    .then((result) => {
      console.log('reviews result', result);
      setValues((values) => ({
        ...values,
        name: result.data[0].full_name,
        avatar: result.data[0].avatar,
        riderReviews: result.data[0].rider_reviews,
        driverReviews: result.data[0].driver_reviews
      }));
    })
    .catch(err => console.log(err))
    //document.title = `You clicked ${count} times`;
  }, [submitted]);

  // const submitForm = () => {
  //   console.log('form succesfully submitted');
  // }

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

  if (values.name.length > 0) {
    return (
      <div>
        <div className="person-of-interest">{values.name}</div>
        <img className="review-photo" width="80px" height="80px" alt="" src={values.avatar}/>
        <div className="poi-overall-rating">
          <FiveStars rating={calculateRating()}/>
        </div>
        <button className="btn-write-review" onClick={() => setShowModal(true)}>Write Your Review</button>
        <div>
          {values.riderReviews.map(review => {
            return (
              <ReviewTile review={review} key={review._id}/>
            )
          })}
          {values.driverReviews.map(review => {
            return (
              <ReviewTile review={review} key={review._id}/>
            )
          })}
        </div>
        <ReviewModal show={showModal} userid={id} submit={() => setSubmitted()} close={() => setShowModal(false)} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}