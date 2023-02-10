/* eslint-disable no-undef */
import React from 'react';

  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

// need the trip distance in miles
const AnalyticsDriver = (props) => {

  const kmpg = 25;

  const gasPricePerGallon = 4.50

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    console.log('HEREE.', lat1, lng1, lat2, lng2);
    let from = {lat: lat1, lng: lng1}
    let to = {lat: lat2, lng: lng2}
    let dist = (google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000).toFixed(2)
    console.log('DIST', dist)
    return dist;
  }

  let savings = (calculateDistance(props.driver_route.start_lat, props.driver_route.start_lng, props.driver_route.end_lat, props.driver_route.end_lat) / kmpg * gasPricePerGallon).toFixed(2);

  return (
    <div>
      <p className="riders">Your Savings:</p>
      <p className="riders">${savings}</p>
    </div>
  )
}

export default AnalyticsDriver;