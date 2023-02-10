import React from 'react';
import PassengerCard from './PassengerCard.jsx';

const PassengerList = (props) => {

  return (
    <div>
      <p className="riders">Write Your Review</p>
      <div className="passenger-list">
        { props.pIds.map( (pId) => <PassengerCard user={props.user} pId={pId} key={pId} view={props.view}/>) }
      </div>
    </div>
  )
}

export default PassengerList;