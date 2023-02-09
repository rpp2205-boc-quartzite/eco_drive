import React from 'react';

  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

// need the trip distance in miles
const Analytics = (props) => {

  const mpg = 20;

  const gasPricePerGallon = 4.50

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    return 10;
  }

  let savings = calculateDistance(props.driver_route.start_lat, props.driver_route.start_lng, props.driver_route.end_lat, props.driver_route.end_lat) / mpg * gasPricePerGallon;

  return (
    <div>
      <p className="riders">Your Savings:</p>
      <p className="riders">${savings}</p>
    </div>
  )
}

export default Analytics;