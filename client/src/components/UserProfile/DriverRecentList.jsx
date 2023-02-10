import React from 'react';
import DriverRecentCard from './DriverRecentCard.jsx';
import axios from 'axios';


class DriverRecentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('checking DriverRecentList props', this.props.wholeObj)
      return (
        <div>
          {this.props.recent_riders.map((driver) =>
            <DriverRecentCard
            key={driver}
            id={driver}
            wholeObj={this.props.wholeObj}
            />
          )}
        </div>
      )
  }
}

export default DriverRecentList;


