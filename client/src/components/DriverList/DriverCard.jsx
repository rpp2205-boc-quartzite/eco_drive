import React, { useState } from 'react';
import { FiInfo } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import DriverConfirmation from './DriverConfirmation.jsx'

const DriverCard = ({driverInfo, startDistance, endDistance, bookDriver}) => {

  const [driverConfirmationOn, setDriverConfirmation] = useState(false);

  const toggleDriverConfirmation = () => {
    setDriverConfirmation(!driverConfirmationOn)
  }

  return (
    <>
      {
        driverConfirmationOn &&
        <DriverConfirmation
          driverInfo={driverInfo}
          toggleDriverConfirmation={toggleDriverConfirmation}
          bookDriver={bookDriver}
        />
      }
      <div className='card'>
        <div className='card-header'>
          <img className='avatar' src={driverInfo.avatar} alt="Driver Avatar" />
          <p>{driverInfo.full_name}</p>
          <CgProfile className='info-icon'/>
        </div>
        <p>From: {startDistance.text} from your starting point</p>
        <p>To: {endDistance.text} from your destination</p>
        <p>Time: {driverInfo.driver_route.time} </p>
        <button className='secondary-btn' onClick={() => {toggleDriverConfirmation()}}>Select Driver</button>
      </div>
    </>
  )
}

export default DriverCard;