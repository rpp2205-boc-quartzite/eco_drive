import React, { useState } from 'react';
import axios from 'axios';
import './ongoing-trip-style.css';

class UpcomingTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      hasRiderRoute: false,
      hasDriverRoute: false,
      driver: null
    }
  }

  componentDidMount () {
    axios.get('/getdriverview',  { params: {userId: this.props.user} })
      .then(result => {
        let user = result.data[0];
        // console.log('USSSSEERRR:', user);
        this.setState( { user } ); // set the user profile

        if (!user.rider_route.started && user.rider_route.driver_id) { // upcoming route as a rider
          let driverId = user.rider_route.driver_id;
          axios.get('/getdriverview', { params: {userId: driverId}})
            .then(result => {
              let driver = result.data[0];
              // console.log('DRIVEERRRR:', driver);
              this.setState( {driver, hasRiderRoute: true} ); // set the driver profile
            })
            .catch(err => {
              console.log('Failed');
            })
        }

        if (!user.driver_route.started && user.driver_route.riders.length > 0) { // upcoming route as a driver
          this.setState( {driver: user, hasDriverRoute: true} ) // set driver as user
        }
      })
      .catch(err => console.log('ERR: ', err))
  }

  startTrip () {
    // start driver trip
    if (hasDriverRoute) {
      axios.put(`/start-driver-trip/${this.state.user._id}`)
      .then(result => {
        console.log('RESULT:', result);
        this.setState(hasDriverRoute: false);
      })
      .catch(err => {
        console.log('ERROR HERE:', err);
      })
    // start rider trip
    } else if (hasRiderRoute) {
      axios.put(`/start-rider-trip/${this.state.user._id}`)
      .then(result => {
        console.log('RESULT:', result);
        this.setState(hasRiderRoute: false);
      })
      .catch(err => {
        console.log('ERROR HERE:', err);
      })
    }
  }

  render () {
    // upcoming route as driver
    if (hasDriverRoute) {
      return (
        <div className="ongoing-trip-container">
          <div className="ongoing-title">Upcoming Trip</div>
          <div className="card">
            <div>
              <div >
                <img src={this.state.user.avatar} alt="avatar" className='profilePhoto'/>
              </div>
              <span>{this.state.user.full_name}</span>
              <span>Heart</span>
              <span>Info</span>
            </div>
            <div className="detail"> {this.state.user.driver_route.start_address} </div>
            <div className="detail"> {this.state.user.license_plate} </div>
            <div className="detail"> {this.state.user.driver_route.time} </div>
            <div className="buttons">
              <button className="end-button">Cancel</button>
              <button type='submit' onClick={this.startTrip.bind(this)} className="end-button" id="start-trip-button">Start Trip</button>
            </div>
          </div>
        </div>
      )
    // upcoming route as rider
    } else if (hasRiderRoute) {
      return (
        <div className="ongoing-trip-container">
          <div className="ongoing-title">Upcoming Trip</div>
          <div className="card">
            <div>
              <div >
                <img src={this.state.driver.avatar} alt="avatar" className='profilePhoto'/>
              </div>
              <span>{this.state.driver.full_name}</span>
              <span>Heart</span>
              <span>Info</span>
            </div>
            <div className="detail"> {this.state.user.rider_route.start_address} </div>
            <div className="detail"> {this.state.driver.license_plate} </div>
            <div className="detail"> {this.state.user.rider_route.time} </div>
            <div className="buttons">
              <button className="end-button">Cancel</button>
              <button type='submit' onClick={this.startTrip.bind(this)} className="end-button" id="start-trip-button">Start Trip</button>
            </div>
          </div>
        </div>
      )
    // no upcoming routes
    } else {
      return (
        <div className="ongoing-trip-container">
          <div className="ongoing-title">Upcoming Trip</div>
            <div className="card">
              <p> No Upcoming Routes </p>
            </div>
        </div>
      )
    }
  }
}

export default UpcomingTrip;