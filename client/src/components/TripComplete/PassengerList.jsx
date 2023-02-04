import React from 'react';
import PassengerCard from './PassengerCard.jsx';

const PassengerList = () => {

  const passengerList = [{}, {}, {}];

  return (
    <div className="passengerList">

      <p> Favorite or Review Passengers </p>

      { passengerList.map( (passenger) => <PassengerCard/>) }

    </div>
  )
}

export default PassengerList;