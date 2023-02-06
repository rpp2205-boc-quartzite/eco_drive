import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInfo } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import axios from 'axios';
import './ongoing-trip-style.css';


const OngoingTrip = (props) => {

  console.log('Driver info: ', props);

  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const myFunc = async () => {
      let result = await axios.get('/getdriverview',  { params: {userId: props.userId} }).catch(err => console.log('ERR: ', err))
      console.log('REUSULTT', result);
      result = result.data[0];
      setUser(result);
      let driverId = result.rider_route.driver_id;
      let driverInfo = await axios.get('/getriderview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
      console.log('REUSULTT2222', driverInfo);
      driverInfo = driverInfo.data[0];
      setDriver(driverInfo);
    }
    myFunc();
  }, [])

  // useEffect(() => {
  //   const myFunc = async () => {
  //     await getUser(props.user);
  //     await getDriver();
  //   }
  //   myFunc();
  // }, [user]);

  // const getUser = async (userId) => {
  //   let result = await axios.get('/getdriverview',  { params: {userId} }).catch(err => console.log('ERR: ', err))
  //   result = result.data[0];
  //   setUser(result);
  // }

  // ongoing route as a rider
  // const getDriver = async () => {
  //   let driverId = user.rider_route.driver_id;
  //   let result = await axios.get('/getriderview', { params: {userId: driverId}}).catch(err => console.log('ERR: ', err))
  //   result = result.data[0];
  //   console.log('result', result);
  //   setDriver(result);
  // }

  // end trip
  // const endTrip = async () => {
  //   console.log('before', user);
  //   let route = (user.driver_route.started? 'driver': 'rider')
  //   let result = await axios.put(`/end-trip/${user._id}/${route}`).catch(err => console.log('ERROR:', err))
  //   console.log('after', user);
  // }

  console.log('Driver:', driver);

  if (user && driver) {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Ongoing Trip</div>
        <div className="trip-card">
          <div className="profile">
            <div>
              <img src={driver.avatar} alt="avatar" className='profilePhoto'/>
            </div>
            <span id="name">{driver.full_name}</span>
            <div>
              {user.favorites.includes(driver._id)
                ? <HiHeart className='card-icon full-heart-icon'/>
                : (<p> </p>)
              }
            </div>
            <Link to="/ratings-reviews">
              <FiInfo className='card-icon info-icon'/>
            </Link>
          </div>
          <div className="detail"> {driver.driver_route.start_address} </div>
          <div className="detail"> {driver.license_plate} </div>
          <div className="detail"> {driver.driver_route.time} </div>
          <div className="buttons">
            <button className="end-button">Cancel</button>
            {/* <Link to="/trip-complete" state={{ user }}> */}
              <button type='submit' onClick={props.endTrip} className="end-button" id="end-trip-button">End Trip</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ongoing-trip-container">
        <div className="ongoing-title">Ongoing Trip</div>
        <div className="card">
          <p> No Active Routes </p>
        </div>
      </div>
    )
  }

  // no ongoing routes
  // if (!props.active) {
  //   return (
  //     <div className="ongoing-trip-container">
  //       <div className="ongoing-title">Ongoing Trip</div>
  //       <div className="card">
  //         <p> No Active Routes </p>
  //       </div>
  //     </div>
  //   )
  // // user driver_route started
  // } else if (user && user.driver_route.started) {
  //   return (
  //     <div className="ongoing-trip-container">
  //       <div className="ongoing-title">Ongoing Trip</div>
  //       <div className="trip-card">
  //         <div className="profile">
  //           <div>
  //             <img src={user.avatar} alt="avatar" className='profilePhoto'/>
  //           </div>
  //           <span id="name">{user.full_name}</span>
  //           <div>
  //             <p> </p>
  //           </div>
  //           <Link to="/ratings-reviews">
  //             <FiInfo className='card-icon info-icon'/>
  //           </Link>
  //         </div>
  //         <div className="detail"> {user.driver_route.start_address} </div>
  //         <div className="detail"> {user.license_plate} </div>
  //         <div className="detail"> {user.driver_route.time} </div>
  //         <div className="buttons">
  //           <button className="end-button">Cancel</button>
  //           {/* <Link to="/trip-complete" state={{ user }}> */}
  //             <button type='submit' onClick={endTrip} className="end-button" id="end-trip-button">End Trip</button>
  //           {/* </Link> */}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // // ongoing route as a rider
  // // if the driver is set
  // } else if (driver) {
  //   return (
  //     <div className="ongoing-trip-container">
  //       <div className="ongoing-title">Ongoing Trip</div>
  //       <div className="trip-card">
  //         <div className="profile">
  //           <div>
  //             <img src={driver.avatar} alt="avatar" className='profilePhoto'/>
  //           </div>
  //           <span id="name">{driver.full_name}</span>
  //           <div>
  //             {driver.favorites.includes(user._id)
  //               ? <HiHeart className='card-icon full-heart-icon'/>
  //               : (<p> </p>)
  //             }
  //           </div>
  //           <Link to="/ratings-reviews">
  //             <FiInfo className='card-icon info-icon'/>
  //           </Link>
  //         </div>
  //         <div className="detail"> {driver.driver_route.start_address} </div>
  //         <div className="detail"> {driver.license_plate} </div>
  //         <div className="detail"> {driver.driver_route.time} </div>
  //         <div className="buttons">
  //           <button className="end-button">Cancel</button>
  //           {/* <Link to="/trip-complete" state={{ user }}> */}
  //             <button type='submit' onClick={endTrip} className="end-button" id="end-trip-button">End Trip</button>
  //           {/* </Link> */}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className="ongoing-trip-container">
  //       <div className="ongoing-title">Ongoing Trip</div>
  //       <div className="card">
  //         <p> No Active Routes </p>
  //       </div>
  //     </div>
  //   )
  // }
}

export default OngoingTrip;