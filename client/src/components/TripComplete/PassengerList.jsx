import React from 'react';
import PassengerCard from './PassengerCard.jsx';

const PassengerList = (props) => {

  return (
    <div className="passengerList">

      <p className="riders">Write Your Review</p>

      { props.passengers.map( (passenger) => <PassengerCard pId={passenger} key={passenger} />) }

    </div>
  )
}

export default PassengerList;