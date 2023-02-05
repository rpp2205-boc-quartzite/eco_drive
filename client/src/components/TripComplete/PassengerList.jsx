import React from 'react';
import PassengerCard from './PassengerCard.jsx';

const PassengerList = (props) => {

  const passengers = []

  return (
    <div className="passengerList">

      <p className="riders">Write Your Review</p>

      <PassengerCard/>
      <PassengerCard/>
      <PassengerCard/>

      {/* { passengers.map( (passenger) => <PassengerCard pId={passenger} key={passenger} />) } */}

    </div>
  )
}

export default PassengerList;