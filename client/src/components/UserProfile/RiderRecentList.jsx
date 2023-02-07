import React from 'react';
import RiderRecentCard from './RiderRecentCard.jsx';


class RiderRecentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('asdf', this.props.recent_drivers)
      return (
        <div>
          {this.props.recent_drivers.map((driver) =>
            <RiderRecentCard
            key={driver}
            id={driver}
            />
          )}
        </div>
      )
  }
}

export default RiderRecentList;


