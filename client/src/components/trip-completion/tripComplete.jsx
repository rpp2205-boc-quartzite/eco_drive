import React from 'react';
import Analytics from './Analytics.jsx';
import LeaveReviews from './LeaveReviews.jsx';

  // this trip info will be written to the database as soon as the Complete Button is Clicked,
  // and also sent to the analytics component in the client coded

const tripComplete = () => {
  return (
    <div>
      <h1>Trip Completed!</h1>
      <Analytics/>
      <LeaveReviews/>
    </div>
  )
}

export default tripComplete;