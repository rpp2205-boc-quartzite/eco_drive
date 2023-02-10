import React from 'react';
import PreviousDrivesCard from './PreviousDrivesCard.jsx';
import axios from 'axios';

class PreviousDrivesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('checking PreviousDrivesList props', this.props.driver_trips)
      return (
        <div className='profilePreviousBox'>
          {this.props.driver_trips.map((trip) =>
            <PreviousDrivesCard
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

export default PreviousDrivesList;