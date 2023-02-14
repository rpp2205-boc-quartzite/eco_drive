/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import ReviewTile from './ReviewTile.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import Reviews from './Reviews.jsx';
import { useLocation } from 'react-router-dom';

const calculateRidersOverallRating = (riderRatings) => {
  let count = 0;
  let sum = 0;
  let result = 0;
  console.log('riderRatings', riderRatings);

  riderRatings.forEach(rating => {
    console.log('rating', rating);
    count++;
    sum += rating;
  })

  result = sum/count;
  console.log('calculateRidersOverallRating', result);
  return result;
}

const calculateDriversOverallRating = (driverRatings) => {
  let count = 0;
  let sum = 0;
  let result = 0;
  console.log('driverRatings', driverRatings);

  driverRatings.forEach(rating => {
    console.log('rating', rating);
    count++;
    sum += rating;
  })

  result = sum/count;
  console.log('calculateDriversOverallRating', result);
  return result;
}

const retrieveAllDriverRatings = (driverReviews) => {
  let ratings = [];
  driverReviews.forEach(review => {
    ratings.push(review.rating);
  })

  return ratings;
}

const retrieveAllRiderRatings = (riderReviews) => {
  let ratings = [];
  riderReviews.forEach(review => {
    ratings.push(review.rating);
  })

  return ratings;
}

export default function AllReviews(props) {
  const location = useLocation();
  console.log('location: ', location.state.text);
  const [isToggled, setToggles] = useState([0,0,0,0,0]);
  // const [values, setValues] = useState({
  //   name: '',
  //   avatar: null,
  //   riderReviews: [],
  //   driverReviews: [],
  //   driverRatings: [],
  //   riderRatings: [],
  //   allOriginalRiderReviews: [],
  //   allOriginalDriverReviews: [],
  //   sortedOption: 'newest',
  //   sortedReviews: [],
  //   driverOverallRating: 0,
  //   riderOverallRating: 0,
  //   rating: null
  // });

  const [values, setValues] = useState({
    riderReviews: [],
    driverReviews: [],
    driverRatings: [],
    riderRatings: [],
    allOriginalRiderReviews: [],
    allOriginalDriverReviews: [],
    sortedOption: 'newest',
    sortedReviews: [],
    driverOverallRating: 0,
    riderOverallRating: 0,
    rating: null
  });

  // let id = '63d36e8fcd478f26557c4a37';

  useEffect(() => {
    console.log('revieweeData: ', location.state.revieweeData);
    let driverReviews = location.state.revieweeData.driver_reviews;
    console.log('driverReviews: ', driverReviews);
    let driverRatings = retrieveAllDriverRatings(driverReviews);
    let driverOverallRating = calculateDriversOverallRating(driverRatings);
    let riderReviews = location.state.revieweeData.rider_reviews;
    let riderRatings = retrieveAllRiderRatings(riderReviews);
    let riderOverallRating = calculateRidersOverallRating(riderRatings);
    // var id = props.revieweeData._id;
    setValues((values) => ({
      ...values,
      riderReviews: riderReviews,
      driverReviews: driverReviews,
      driverRatings: driverRatings,
      riderRatings: riderRatings,
      allOriginalRiderReviews: riderReviews,
      allOriginalDriverReviews: driverReviews,
      driverOverallRating: driverOverallRating,
      riderOverallRating: riderOverallRating
    }))
    // axios.get('/getreviews', { params: {id} })
    // .then((result) => {
    //   console.log('reviews result', result);
    //   let driverRatings = retrieveAllDriverRatings(result.data[0].driver_reviews);
    //   let riderRatings = retriveAllRiderRatings(result.data[0].rider_reviews);
    //   let driverOverallRating = calculateRidersOverallRating(driverRatings);
    //   let riderOverallRating = calculateDriversOverallRating(riderRatings);
    //   setValues((values) => ({
    //     ...values,
    //     name: result.data[0].full_name,
    //     avatar: result.data[0].avatar,
    //     allOriginalRiderReviews: result.data[0].rider_reviews,
    //     allOriginalDriverReviews: result.data[0].driver_reviews,
    //     riderReviews: result.data[0].rider_reviews,
    //     driverReviews: result.data[0].driver_reviews,
    //     driverOverallRating: driverOverallRating,
    //     riderOverallRating: riderOverallRating,
    //     driverRatings: driverRatings,
    //     riderRatings: riderRatings
    //   }));
    // })
    // .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (values.allOriginalDriverReviews.length > 0 || values.allOriginalRiderReviews.length > 0) {
      let filter = (reviews, allReviews) => {
        console.log('all reviews', allReviews);
        let filteredReviews = [];
        isToggled.forEach((element, index) => {
          if (element === 1) {
            allReviews.forEach(review => {
              if (review.rating === index + 1) {
                filteredReviews.push(review);
              }
            })
          }
        })

        console.log('filteredReviews: ', filteredReviews);

        if (location.state.text.includes('driver')) {
          if (filteredReviews.length === 0) {
            setValues((values) => ({
              ...values,
              driverReviews: allReviews
            }));
          } else {
            setValues((values) => ({
              ...values,
              driverReviews: filteredReviews
            }));
          }
        } else {
          if (filteredReviews.length === 0) {
            setValues((values) => ({
              ...values,
              riderReviews: allReviews
            }));
          } else {
            setValues((values) => ({
              ...values,
              riderReviews: filteredReviews
            }));
          }
        }
      }

      if (location.state.text.includes('driver')) {
        filter(values.driverReviews, values.allOriginalDriverReviews);
      } else {
        filter (values.riderReviews, values.allOriginalRiderReviews);
      }
    }
  }, [isToggled, values.allOrignalDriverReviews, values.allOriginalRiderReviews]);

  const sort = (event) => {
    console.log('in sort - location.state.text: ', location.state.text);
    console.log('driverReviews: ', values);
    if (location.state.text.includes('driver')) {
      values.driverReviews.forEach(review => {
        let timestamp = review._id.toString().substring(0, 8);
        let date = new Date( parseInt( timestamp, 16 ) * 1000 );
        let shortDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
        review.date = shortDate;
        console.log('review: ', review);
      });
      values.sortedReviews = values.driverReviews.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      values.riderReviews.forEach(review => {
        let timestamp = review._id.toString().substring(0, 8);
        let date = new Date( parseInt( timestamp, 16 ) * 1000 );
        let shortDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
        review.date = shortDate;
        console.log('review: ', review);
      });
      values.sortedReviews = values.riderReviews.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
  }


  return (
    <div>
      <div className="reviewHeader">
        <div className="reviewHeaderBackButton">
          <Link to="/ratings-reviews" state={{userData: location.state.userData, revieweeData: location.state.revieweeData, route: location.state.route, from: location.state.from, view: location.state.view, mapData: location.state.mapData }}>
            <BiArrowBack className="backButton" color={'#262929'} size={20} />
          </Link>
        </div>
      </div>
      <div>
        {location.state.text.includes('driver') ? (
          <RatingsBreakdown className={location.state.text} overallRating={values.driverOverallRating} allReviews={values.allOriginalDriverReviews} allRatings={values.driverRatings} changeToggles={setToggles} isToggled={isToggled} />
          ) : (
          <RatingsBreakdown className={location.state.text} overallRating={values.riderOverallRating} allReviews={values.allOriginalRiderReviews} allRatings={values.riderRatings} changeToggles={setToggles} isToggled={isToggled} />
        )}
      </div>
      <div>
        {location.state.text.includes('driver') ? (
          sort(values.sortedOption),
          values.sortedReviews.map(review =>
            {
              return (
                <ReviewTile className={location.state.text} review={review} key={review._id} />
              )
            }
          )
          ) : (
          sort(values.sortedOption),
          values.sortedReviews.map(review =>
            {
              return (
                <ReviewTile className={location.state.text} review={review} key={review._id} />
              )
            }
          )
        )}
      </div>
    </div>
  )
}