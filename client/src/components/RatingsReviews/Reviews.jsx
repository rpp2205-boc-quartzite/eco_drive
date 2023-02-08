/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal.jsx';
import ReviewTile from './ReviewTile.jsx';
import OverallRating from './OverallRating.jsx';
import AllReviews from './AllReviews.jsx';
import { useLocation } from 'react-router-dom'
import { RiRefreshLine, RiLogoutBoxRLine, RiHome4Fill, RiPencilFill, RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { BiArrowBack } from 'react-icons/bi';

export default function Reviews(props) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reported, setReported] = useState(false);
  const [reportModal, showReportModal] = useState(false);
  const [allDriverReviews, setAllDriverReviews] = useState(false);
  const [allRiderReviews, setAllRiderReviews] = useState(false);
  const location = useLocation();
  // console.log('props', props);
  // console.log('location.state', location.state);
  const userData = location.state.userData;
  // console.log('userData: ', userData);
  const revieweeData = location.state.revieweeData;
  // console.log('revieweeData: ', revieweeData);
  const userId = userData._id;
  const userInfo = userData;
  const route = location.state.route;
  // console.log('userId: ', userId);
  const revieweeId = revieweeData._id;
  // console.log('revieweeId: ', revieweeId);
  // console.log('route: ', location.state.route);

  const [favoriteDriver, setFavoriteDriver] = useState((userData.favorites || []).includes(revieweeData._id));

  const toggleFavoriteDriver = () => {
    console.log('favorite - test');
    if (favoriteDriver) {
      removeDriverOffFavorites()
        .then(() => {
          setFavoriteDriver(!favoriteDriver)
          console.log('Successfully unfavorite driver ', revieweeData.full_name)
        })
        .catch(() => console.log('Unable to unfavorite driver'))
    } else {
      addDriverToFavorites()
        .then(() => {
          setFavoriteDriver(!favoriteDriver)
          console.log('Successfully favorite driver ', revieweeData.full_name)
        })
        .catch(() => console.log('Unable to favorite driver'))
    }
  }

  const addDriverToFavorites = () => {
    return axios.put(`/driver-list/?action=add-favorite&driverId=${revieweeId}&userId=${userId}`, {});
  }

  const removeDriverOffFavorites = () => {
    return axios.put(`/driver-list/?action=remove-favorite&driverId=${revieweeId}&userId=${userId}`, {});
  }

  useEffect(() => {
    let id = revieweeId;
      axios.get('/getreviews', { params: {id} })
      .then((result) => {
        console.log('reviews result', result);
        revieweeData.rider_reviews = result.data[0].rider_reviews;
        revieweeData.driver_reviews = result.data[0].driver_reviews;
      })
      .catch(err => console.log(err))
  }, [submitted]);

  const sort = () => {
    console.log('testing sort');
    revieweeData.rider_reviews.forEach(review => {
      let timestamp = review._id.toString().substring(0, 8);
      let date = new Date( parseInt( timestamp, 16 ) * 1000 );
      let shortDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
      review.date = shortDate;
    });
    revieweeData.sortedRiderReviews = revieweeData.rider_reviews.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
    revieweeData.driver_reviews.forEach(review => {
      let timestamp = review._id.toString().substring(0, 8);
      let date = new Date( parseInt( timestamp, 16 ) * 1000 );
      let shortDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
      review.date = shortDate;
    });
    revieweeData.sortedDriverReviews = revieweeData.driver_reviews.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  const calculateRating = () => {
    let count = 0;
    let sum = 0;
    let result = 0;
    revieweeData.rider_reviews.forEach(review => {
      console.log('review', review);
      count++;
      sum += review.rating;
    })
    revieweeData.driver_reviews.forEach(review => {
      console.log('review', review);
      count++;
      sum += review.rating;
    })
    result = sum/count;
    return result;
  }

  sort();
  console.log('driver reviews: ', revieweeData.driver_reviews);
  console.log('rider reviews: ', revieweeData.rider_reviews);
  console.log('submitted: ', submitted);
  console.log('favorited: ', favoriteDriver);
  console.log('revieweeData has own properties: ', revieweeData.hasOwnProperty('test'), revieweeData.hasOwnProperty('driver_reviews'));

  return (
    <div>
    <div className="reviewHeader">
    <div className="reviewHeaderBackButton">
      {
        location.state.from === 'driver-list'
        ? <Link to="/driver-list" state={{route: route, userInfo: userInfo}}>
            <BiArrowBack className="backButton" size={20} />
          </Link>
        : <Link to="/riderview">
            <BiArrowBack className="backButton" size={20} />
          </Link>
      }
    </div>
    <div className="reviewHeaderLogout">
      <Link to="/">
        <RiLogoutBoxRLine className="logout" size={20} />
      </Link>
    </div>
    <div className="reviewHeaderHome">
      <Link to="/driverview">
        <RiHome4Fill size={20} />
      </Link>
    </div>
    </div>
      {
        revieweeData.is_driver
        ?  <div className="reviewFavorite">
            {
              favoriteDriver
              ? <RiHeart3Fill className="unfavorite" color="red" size={25} onClick={toggleFavoriteDriver} />
              : <RiHeart3Line className="favorite" size={25} onClick={toggleFavoriteDriver} />
            }
            </div>
        : null
      }
    <div className="profilePhotoDiv">
      <img className="review-photo" alt="" src={revieweeData.avatar}/>
    </div>
    <div className="profileName">{revieweeData.full_name}
      <span className='profileOnline'>&#183;</span>
    </div>
      {
        revieweeData.rider_reviews.length !== 0 || revieweeData.driver_reviews.length !== 0
        ?  <div className="poi-overall-rating">
             <OverallRating rating={calculateRating()}/>
           </div>
        :  <div className="poi-overall-rating">
            <OverallRating rating={0}/>
           </div>
      }
    <div className='writeReviewButton'>
      <button
        disabled={submitted === true}
        className='btn-write-review'
        onClick={() =>
          {
            showReportModal(false);
            setShowModal(true);
          }
        }
      >
        Write Your Review
        <RiPencilFill size="10px" color="green" />
      </button>
    </div>
    <div className='reportButton'>
      <button
        disabled={reported === true}
        className='btn-report-review'
        onClick={() =>
          {
            showReportModal(true);
            setShowModal(true);
          }
        }
      >
        Report this Driver
      </button>
    </div>
    <div>
      {(() => {
        if (revieweeData.driver_reviews.length === 0 && revieweeData.rider_reviews.length === 0) {
          return (
            <span className='profileTitle'>No reviews have been submitted for this user.</span>
          )
        } else if (revieweeData.driver_reviews.length > 0 && revieweeData.rider_reviews.length > 0) {
          return (
            <div>
              <div className='profileReviewDiv'>
                <span className='profileTitle'>Reviews as a Driver</span>
                <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData, route: route, from: location.state.from }} to="/all-reviews">See All</Link>
                <div className='profileReviewContainer'>
                  {revieweeData.sortedDriverReviews.slice(0, 6).map(review => {
                    return (
                      <ReviewTile className='' review={review} key={review._id} />
                    )
                  })}
                </div>
              </div>
              <div className='profileReviewDiv'>
                <span className='profileTitle'>Reviews as a Rider</span>
                <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData, route: route, from: location.state.from }} to="/all-reviews">See All</Link>
                <div className='profileReviewContainer'>
                  {revieweeData.sortedRiderReviews.slice(0, 6).map(review => {
                    return (
                      <ReviewTile className='' review={review} key={review._id}/>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        } else if (revieweeData.driver_reviews.length > 0 && revieweeData.rider_reviews.length === 0){
          return (
            <div className='profileReviewDiv'>
              <span className='profileTitle'>Reviews as a Driver</span>
              <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData, route: route, from: location.state.from }} to="/all-reviews">See All</Link>
              <div className='profileReviewContainer'>
                {revieweeData.sortedDriverReviews.slice(0, 6).map(review => {
                  return (
                    <ReviewTile className='' review={review} key={review._id} />
                  )
                })}
              </div>
            </div>
          )
        } else {
          return (
            <div className='profileReviewDiv'>
              <span className='profileTitle'>Reviews as a Rider</span>
              <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData, route: route, from: location.state.from }} to="/all-reviews">See All</Link>
              <div className='profileReviewContainer'>
                {revieweeData.sortedRiderReviews.slice(0, 6).map(review => {
                  return (
                    <ReviewTile className='' review={review} key={review._id}/>
                  )
                })}
              </div>
            </div>
          )
        }
      })()}
    </div>
    <ReviewModal show={showModal} isReportModalOpen={reportModal} from={location.state.from} reportUser={setReported} userData={userData} revieweeData={revieweeData} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
  </div>
  )
}

// if (revieweeData.driver_reviews.length === 0 && revieweeData.rider_reviews.length === 0) {
  //   return (
  //     <div>
  //     <div className="reviewHeader">
  //       <div className="reviewHeaderBackButton">
  //         {
  //           location.state.from === 'driver-list'
  //           ? <Link to="/driver-list" state={{route: route, userInfo: userInfo}}>
  //               <BiArrowBack className="backButton" size={20} />
  //             </Link>
  //           : <Link to="/driverprofile">
  //               <BiArrowBack className="backButton" size={20} />
  //             </Link>
  //         }
  //       </div>
  //       <div className="reviewHeaderLogout">
  //         <Link to="/">
  //           <MdLogout className="logout" size={20} />
  //         </Link>
  //       </div>
  //       <div className="reviewHeaderHome">
  //         <Link to="/driverview">
  //           <AiFillHome size={20} />
  //         </Link>
  //       </div>
  //     </div>
  //       {
  //         revieweeData.is_driver
  //         ?  <div className="reviewFavorite">
  //             {
  //               favoriteDriver
  //               ? <AiFillHeart className="unfavorite" color="red" size={25} onClick={toggleFavoriteDriver} />
  //               : <AiOutlineHeart className="favorite" size={25} onClick={toggleFavoriteDriver} />
  //             }
  //             </div>
  //         : null
  //       }
  //     <div className="profilePhotoDiv">
  //       <img className="review-photo" alt="" src={revieweeData.avatar}/>
  //     </div>
  //     <div className="profileName">{revieweeData.full_name}
  //       <span className='profileOnline'>&#183;</span>
  //     </div>
  //     <div className="poi-overall-rating">
  //       <OverallRating rating={calculateRating()}/>
  //     </div>
  //     <div className='writeReviewButton'>
  //       <button
  //         disabled={submitted === true}
  //         className='btn-write-review'
  //         onClick={() =>
  //           {
  //             showReportModal(false);
  //             setShowModal(true);
  //           }
  //         }
  //       >
  //         Write Your Review
  //         <FaPen size="10px" color="green" />
  //       </button>
  //     </div>
  //     <div className='reportButton'>
  //       <button
  //         disabled={reported === true}
  //         className='btn-report-review'
  //         onClick={() =>
  //           {
  //             showReportModal(true);
  //             setShowModal(true);
  //           }
  //         }
  //       >
  //         Report this Driver
  //       </button>
  //     </div>
  //     <div className='profileReviewDiv'>
  //       <span className='profileTitle'>No reviews have been submitted for this user.</span>
  //     </div>
  //     <ReviewModal show={showModal} isReportModalOpen={reportModal} reportUser={setReported} userData={userData} revieweeData={revieweeData} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
  //   </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <div className="reviewHeader">
  //         <div className="reviewHeaderBackButton">
  //           {
  //             location.state.from === 'driver-list'
  //             ? <Link to="/driver-list" state={{route: route, userInfo: userInfo}}>
  //                 <BiArrowBack className="backButton" size={20} />
  //               </Link>
  //             : <Link to="/driverprofile">
  //                 <BiArrowBack className="backButton" size={20} />
  //               </Link>
  //           }
  //         </div>
  //         <div className="reviewHeaderLogout">
  //           <Link to="/">
  //             <MdLogout className="logout" size={20} />
  //           </Link>
  //         </div>
  //         <div className="reviewHeaderHome">
  //           <Link to="/driverview">
  //             <AiFillHome size={20} />
  //           </Link>
  //         </div>
  //       </div>
  //         {
  //           revieweeData.is_driver
  //           ?  <div className="reviewFavorite">
  //               {
  //                 favoriteDriver
  //                 ? <AiFillHeart className="unfavorite" color="red" size={25} onClick={toggleFavoriteDriver} />
  //                 : <AiOutlineHeart className="favorite" size={25} onClick={toggleFavoriteDriver} />
  //               }
  //             </div>
  //           : null
  //         }
  //       <div className="profilePhotoDiv">
  //         <img className="review-photo" alt="" src={revieweeData.avatar}/>
  //       </div>
  //       <div className="profileName">{revieweeData.full_name}
  //         <span className='profileOnline'>&#183;</span>
  //       </div>
  //       <div className="poi-overall-rating">
  //         <OverallRating rating={calculateRating()}/>
  //       </div>
  //       <div className='writeReviewButton'>
  //         <button
  //           disabled={submitted === true}
  //           className='btn-write-review'
  //           onClick={() =>
  //             {
  //               showReportModal(false);
  //               setShowModal(true);
  //             }
  //           }
  //         >
  //           Write Your Review
  //           <FaPen size="10px" color="green" />
  //         </button>
  //       </div>
  //       <div className='reportButton'>
  //         <button
  //           disabled={reported === true}
  //           className='btn-report-review'
  //           onClick={() =>
  //             {
  //               showReportModal(true);
  //               setShowModal(true);
  //             }
  //           }
  //         >
  //           Report this Driver
  //         </button>
  //       </div>
  //       <div className='profileReviewDiv'>
  //         <span className='profileTitle'>Reviews as a Driver</span>
  //         <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
  //         <div className='profileReviewContainer'>
  //           {revieweeData.sortedDriverReviews.slice(0, 6).map(review => {
  //             return (
  //               <ReviewTile className='' review={review} key={review._id} />
  //             )
  //           })}
  //         </div>
  //       </div>
  //       <div className='profileReviewDiv'>
  //         <span className='profileTitle'>Reviews as a Rider</span>
  //         <Link className="btn-select-all-reviews" state={{ text: 'rider', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
  //         <div className='profileReviewContainer'>
  //           {revieweeData.sortedRiderReviews.slice(0, 6).map(review => {
  //             return (
  //               <ReviewTile className='' review={review} key={review._id}/>
  //             )
  //           })}
  //         </div>
  //       </div>
  //       <ReviewModal show={showModal} isReportModalOpen={reportModal} reportUser={setReported} revieweeData={revieweeData} userData={userData} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
  //     </div>
  //   )
  // }