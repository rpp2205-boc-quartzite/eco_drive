/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal.jsx';
import ReviewTile from './ReviewTile.jsx';
import OverallRating from './OverallRating.jsx';
import { RiRefreshLine, RiLogoutBoxRLine, RiHome4Fill, RiPencilFill, RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { BiArrowBack } from 'react-icons/bi';
import AllReviews from './AllReviews.jsx';
import { useLocation } from 'react-router-dom'

export default function Reviews(props) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reported, setReported] = useState(false);
  const [reportModal, showReportModal] = useState(false);
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

  console.log('props', props);
  console.log('location.state', location.state);

  // const [favoriteDriver, setFavoriteDriver] = useState((userInfo.favorites || []).includes(driverInfo._id))

  // const toggleFavoriteDriver = () => {
  //   if (favoriteDriver) {
  //     removeDriverOffFavorites()
  //       .then(() => {
  //         setFavoriteDriver(!favoriteDriver)
  //         console.log('Successfully unfavorite driver ', driverInfo.full_name)
  //       })
  //       .catch(() => console.log('Unable to unfavorite driver'))
  //   } else {
  //     addDriverToFavorites()
  //       .then(() => {
  //         setFavoriteDriver(!favoriteDriver)
  //         console.log('Successfully favorite driver ', driverInfo.full_name)
  //       })
  //       .catch(() => console.log('Unable to favorite driver'))
  //   }

  // }

    // const [favoriteDriver, setFavoriteDriver] = useState((userInfo.favorites || []).includes(driverInfo._id))

  const toggleFavoriteDriver = () => {
    console.log('favorite - test');
    if (!values.favorited) {
      addDriverToFavorites()
        .then(() => {
          setValues((values) => ({
            ...values,
            favorited: true
          }));
        })
    } else {
      removeDriverOffFavorites()
        .then(() => {
          setValues((values) => ({
            ...values,
            favorited: false
          }));
        })
    }
  }

  const addDriverToFavorites = () => {
    // return axios.put(`/driver-list/?action=add-favorite&driverId=${driverInfo._idd}&userId=${userRouteInfo._id}`, {});
    return axios.put(`/driver-list/?action=add-favorite&driverId=${values.userId}&userId=${values.userId}`, {});
  }

  const removeDriverOffFavorites = () => {
    // return axios.put(`/driver-list/?action=remove-favorite&driverId=${driverInfo._id}&userId=${userRouteInfo._id}`, {});
    return axios.put(`/driver-list/?action=remove-favorite&driverId=${values.userId}&userId=${values.userId}`, {});
  }

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

  // const favorite = () => {
  //   console.log('favorite - test');
  //   if (!values.favorited) {
  //     setValues((values) => ({
  //       ...values,
  //       favorited: true
  //     }));
  //     axios.put('/driver-list', {params: {action: 'add-favorite'}})
  //     // addFavorite()
  //   } else {
  //     setValues((values) => ({
  //       ...values,
  //       favorited: false
  //     }));
  //   }
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
              <RiLogoutBoxRLine className="logout" size={20} />
            </Link>
          </div>
          <div className="reviewHeaderHome">
            <Link to="/driverview">
              <RiHome4Fill size={20} />
            </Link>
          </div>
        </div>
        <div className="reviewFavorite">
          {
            values.favorited
            ? <RiHeart3Fill className="unfavorite" color="red" size={25} onClick={toggleFavoriteDriver} />
            : <RiHeart3Line className="favorite" size={25} onClick={toggleFavoriteDriver} />
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
        <div className='profileReviewDiv'>
          <span className='profileTitle'>Reviews as a Driver</span>
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
          <span className='profileTitle'>Reviews as a Rider</span>
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
        <ReviewModal show={showModal} isReportModalOpen={reportModal} reportUser={setReported} userid={values.userId} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}



//   return (
//     <div>
//     <div className="reviewHeader">
//     <div className="reviewHeaderBackButton">
//       {
//         location.state.from === 'driver-list'
//         ? <Link to="/driver-list" state={{route: route, userInfo: userInfo}}>
//             <BiArrowBack className="backButton" size={20} />
//           </Link>
//         : <Link to="/driverprofile">
//             <BiArrowBack className="backButton" size={20} />
//           </Link>
//       }
//     </div>
//     <div className="reviewHeaderLogout">
//       <Link to="/">
//         <MdLogout className="logout" size={20} />
//       </Link>
//     </div>
//     <div className="reviewHeaderHome">
//       <Link to="/driverview">
//         <AiFillHome size={20} />
//       </Link>
//     </div>
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
//       {(() => {
//         if (revieweeData.driver_reviews.length === 0 && revieweeData.rider_reviews.length === 0) {
//           return (
//             <span className='profileTitle'>No reviews have been submitted for this user.</span>
//           )
//         } else if (revieweeData.driver_reviews.length > 0 && revieweeData.rider_reviews.length > 0) {
//           return (
//             <div className='profileReviewDiv'>
//               <span className='profileTitle'>Reviews as a Driver</span>
//               <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
//               <div className='profileReviewContainer'>
//                 {revieweeData.sortedDriverReviews.slice(0, 6).map(review => {
//                   return (
//                     <ReviewTile className='' review={review} key={review._id} />
//                   )
//                 })}
//               </div>
//             </div>
//             <div className='profileReviewDiv'>
//               <span className='profileTitle'>Reviews as a Rider</span>
//               <Link className="btn-select-all-reviews" state={{ text: 'rider', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
//               <div className='profileReviewContainer'>
//                 {revieweeData.sortedRiderReviews.slice(0, 6).map(review => {
//                   return (
//                     <ReviewTile className='' review={review} key={review._id}/>
//                   )
//                 })}
//               </div>
//             </div>
//           )
//         } else if (revieweeData.driver_reviews.length > 0 && revieweeData.rider_reviews.length === 0){
//           return (
//             <div className='profileReviewDiv'>
//               <span className='profileTitle'>Reviews as a Driver</span>
//               <Link className="btn-select-all-reviews" state={{ text: 'driver', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
//               <div className='profileReviewContainer'>
//                 {revieweeData.sortedDriverReviews.slice(0, 6).map(review => {
//                   return (
//                     <ReviewTile className='' review={review} key={review._id} />
//                   )
//                 })}
//               </div>
//             </div>
//           )
//         } else {
//           return (
//             <div className='profileReviewDiv'>
//               <span className='profileTitle'>Reviews as a Rider</span>
//               <Link className="btn-select-all-reviews" state={{ text: 'rider', userData: userData, revieweeData: revieweeData }} to="/all-reviews">See All</Link>
//               <div className='profileReviewContainer'>
//                 {revieweeData.sortedRiderReviews.slice(0, 6).map(review => {
//                   return (
//                     <ReviewTile className='' review={review} key={review._id}/>
//                   )
//                 })}
//               </div>
//             </div>
//           )
//         }
//       })()}
//     </div>
//     <ReviewModal show={showModal} isReportModalOpen={reportModal} reportUser={setReported} userData={userData} revieweeData={revieweeData} submit={() => setSubmitted(true)} close={() => setShowModal(false)} />
//   </div>
//   )

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
