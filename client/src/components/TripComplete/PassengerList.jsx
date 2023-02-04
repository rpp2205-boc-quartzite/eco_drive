import React from 'react';
import PassengerCard from './PassengerCard.jsx';

const PassengerList = () => {

  const passengerList = [{name: 'me'}, {name: 'i'}, {name: 'him'}];

  return (
    <div className="passengerList">

      <p className="riders">Riders</p>

      { passengerList.map( (passenger) => <PassengerCard key={passenger.name} />) }

    </div>
  )
}

export default PassengerList;