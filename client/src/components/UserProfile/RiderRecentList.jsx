import React from 'react';
import RiderRecentCard from './RiderRecentCard.jsx';
import axios from 'axios';

class RiderRecentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('checking RiderRecentList props', this.props.wholeObj)
      return (
        <div>
          {this.props.recent_drivers.map((driver) =>
            <RiderRecentCard
            key={driver}
            id={driver}
            wholeObj={this.props.wholeObj}
            />
          )}
        </div>
      )
  }
}

export default RiderRecentList;


