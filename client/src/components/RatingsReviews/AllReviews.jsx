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
    console.log('review', rating);
    // riderRatings.push(review.rating);
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
    console.log('review', rating);
    //driverRatings.push(review.rating);
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

const retriveAllRiderRatings = (riderReviews) => {
  let ratings = [];
  riderReviews.forEach(review => {
    ratings.push(review.rating);
  })

  return ratings;
}

export default function AllReviews(props) {
  // const [allReviews, setAllReviews] = useState(true);
  // const [hasRendered, setHasRendered] = useState(false);
  const location = useLocation();
  console.log('location: ', location.state.text);
  const [isToggled, setToggles] = useState([0,0,0,0,0]);
  const [values, setValues] = useState({
    name: '',
    avatar: null,
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

  let id = '63d36e8fcd478f26557c4a37';
  // console.log('props: ', props);

  useEffect(() => {
    var id = '63d36e8fcd478f26557c4a37';
    axios.get('/getreviews', { params: {id} })
    .then((result) => {
      console.log('reviews result', result);
      let driverRatings = retrieveAllDriverRatings(result.data[0].driver_reviews);
      let riderRatings = retriveAllRiderRatings(result.data[0].rider_reviews);
      let driverOverallRating = calculateRidersOverallRating(driverRatings);
      let riderOverallRating = calculateDriversOverallRating(riderRatings);
      setValues((values) => ({
        ...values,
        name: result.data[0].full_name,
        avatar: result.data[0].avatar,
        allOriginalRiderReviews: result.data[0].rider_reviews,
        allOriginalDriverReviews: result.data[0].driver_reviews,
        riderReviews: result.data[0].rider_reviews,
        driverReviews: result.data[0].driver_reviews,
        driverOverallRating: driverOverallRating,
        riderOverallRating: riderOverallRating,
        driverRatings: driverRatings,
        riderRatings: riderRatings
      }));
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {

    let filter = (reviews, allReviews) => {
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
    // if (location.state.text.includes('driver')) {
    //   console.log('this is a test for filters', isToggled);
    //   // let results = reviews.filter(review => {
    //   //   return review.rating === value;
    //   // });
    //   let filteredDriverReviews = [];
    //   isToggled.forEach((element, index) => {
    //     if (element === 1) {
    //       values.driverReviews.forEach(review => {
    //         if (review.rating === index + 1) {
    //           filteredDriverReviews.push(review);
    //         }
    //       })
    //     }
    //   })

    //   let allOriginalDriverReviews = values.allOriginalDriverReviews;
    //   console.log('filteredDriverReviews', filteredDriverReviews);
    //   console.log('allOriginalDriverReviews', allOriginalDriverReviews);

    //   if (filteredDriverReviews.length === 0) {
    //     setValues((values) => ({
    //       ...values,
    //       driverReviews: allOriginalDriverReviews
    //     }));
    //   } else {
    //     setValues((values) => ({
    //       ...values,
    //       driverReviews: filteredDriverReviews
    //     }));
    //   }
    // }
    if (location.state.text.includes('driver')) {
      filter(values.driverReviews, values.allOriginalDriverReviews);
    } else {
      filter (values.riderReviews, values.allOriginalRiderReviews);
    }

  }, [isToggled]);

  const sort = (event) => {
    if (event === values.sortedOption) {
      if (location.state.text.includes('driver')) {
        values.driverReviews.forEach(review => {
          let timestamp = review._id.toString().substring(0, 8);
          let date = new Date( parseInt( timestamp, 16 ) * 1000 );
          let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
          review.date = myDate;
          console.log('review: ', review);
        });
        values.sortedReviews = values.driverReviews.sort(function(a,b) {
          return new Date(b.date) - new Date(a.date);
        });
      } else {
        values.riderReviews.forEach(review => {
          let timestamp = review._id.toString().substring(0, 8);
          let date = new Date( parseInt( timestamp, 16 ) * 1000 );
          let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
          review.date = myDate;
          console.log('review: ', review);
        });
        values.sortedReviews = values.riderReviews.sort(function(a,b) {
          return new Date(b.date) - new Date(a.date);
        });
      }
    } else {
      event.persist();
      event = event.target.value;
      if (event === 'newest') {
        if (location.state.text.includes('driver')) {
          values.driverReviews.forEach(review => {
            let timestamp = review._id.toString().substring(0, 8);
            let date = new Date( parseInt( timestamp, 16 ) * 1000 );
            let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
            review.date = myDate;
            console.log('review: ', review);
          });
          values.sortedReviews = values.driverReviews.sort(function(a,b) {
            return new Date(b.date) - new Date(a.date);
          });
        } else {
          values.riderReviews.forEach(review => {
            let timestamp = review._id.toString().substring(0, 8);
            let date = new Date( parseInt( timestamp, 16 ) * 1000 );
            let myDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
            review.date = myDate;
            console.log('review: ', review);
          });
          values.sortedReviews = values.riderReviews.sort(function(a,b) {
            return new Date(b.date) - new Date(a.date);
          });
        }
      } else {
        console.log('selected sort option: ', event);

        // axios.get(`/reviews/${this.state.productId}/${count}/${sort}`)
        //   .then((results) => {
        //     if(this.props.filteredReviewRatings.includes(1)) {
        //       let array = this.props.filteredReviewRatings;
        //       let values = [];
        //       let newReviews = [];

        //       for (var i = 0; i < array.length; i++) {
        //         if (array[i] === 1) {
        //           values.push(i + 1);
        //         }
        //       }

        //       for (var j = 0; j < results.data.results.length; j++) {
        //         for (var k = 0; k < values.length; k++) {
        //           if (values[k] === results.data.results[j].rating) {
        //             newReviews.push(results.data.results[j]);
        //           }
        //         }
        //       }

        //       this.setState({
        //         reviews: newReviews,
        //         sortedReviews: newReviews,
        //         sortOption: sort,
        //         limitReached: false,
        //         tiles: 2
        //       })

        //     } else {
        //       this.setState({
        //         reviews: results.data.results,
        //         sortedReviews: results.data.results,
        //         sortOption: sort,
        //         limitReached: false,
        //         tiles: 2
        //       })
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    }
  }

  // calculateDriversOverallRating();
  // calculateRidersOverallRating();

  return (
    <div>
      <div className="reviewHeader">
      <div className="reviewHeaderBackButton">
        <Link to="/ratings-reviews">
          <BiArrowBack className="backButton" size={20} />
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
      {/* <div className="sort-options">
        {location.state.text.includes('driver') ? (
          <strong>{values.driverReviews.length} reviews, sorted by</strong>
          ) : (
          <strong>{values.riderReviews.length} reviews, sorted by</strong>
        )}
        <select id="review-list-select" value={values.sortedOption} onChange={(e) => {sort(e, false)}}>
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div> */}
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

{/* <Rating_Breakdown productId={this.props.productId} rating={this.props.rating} reviews={this.props.reviews} ratings={this.state.ratings} totalReviews={this.props.totalReviews} totalRatings={this.props.totalRatings} filterReviews={this.filterReviews} clearFilter={this.clearFilter} reviewsMeta={this.props.reviewsMeta}/> */}