import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DriverProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '63d0c1c65e3f6035caf68958', // The authenticated user's ID, hardcoded until prop received
      full_name: '',
      start_address: '',
      end_address: '',
      time: '',
      total_seats: '',
      avatar: ''
    };
  }

  render () {
    return (
      <div>

      </div>
    )
  }
}

export default DriverProfile;