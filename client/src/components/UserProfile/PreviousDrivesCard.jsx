import React from 'react';
import axios from 'axios';

class PreviousDrivesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('this.props in test tile', this.props)
    return (
      this.props.start_address ?
      <div className='profilePreviousRoutesBox'>
        <div className='profilePreviousRouteTitle'>From:</div>
        <div className='profilePreviousRouteInfo'>{this.props.start_address}</div>
        <div className='profilePreviousRouteTitle'>To:</div>
        <div className='profilePreviousRouteInfo'>{this.props.end_address}</div>
        <div className='profilePreviousRouteTitle'>Time:</div>
        <div className='profilePreviousRouteInfo'>{this.props.time}</div>
        </div> : null

      )

  }
}

export default PreviousDrivesCard;