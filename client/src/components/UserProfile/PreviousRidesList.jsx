import React from 'react';
import PreviousRidesCard from './PreviousRidesCard.jsx';
import axios from 'axios';

class PreviousRidesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('checking PreviousRidesList props', this.props.rider_trips)
      return (
        <div className='profilePreviousBox'>
          {this.props.rider_trips.map((trip) =>
            <PreviousRidesCard
            key={trip.driver_id}
            start_address={trip.start_address}
            end_address={trip.end_address}
            time={trip.time}
            />
          )}
        </div>
      )
  }
}

export default PreviousRidesList;