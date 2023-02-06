import React from 'react';

  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

// need the trip distance in miles
const Analytics = (props) => {

  let savings = 4 * 300;

  return (
    <div>
      <p className="riders">Your Savings:</p>
      <p className="riders">${savings}</p>
    </div>
  )
}

export default Analytics;