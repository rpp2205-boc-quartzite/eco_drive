import React from 'react';
import { FiInfo } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const DriverCard = (props) => {

  return (
    <div className='card'>
      <div className='card-header'>
        <img className='avatar' src={props.driverInfo.avatar} alt="Driver Avatar" />
        <p>{props.driverInfo.full_name}</p>
        <CgProfile className='info-icon'/>
      </div>
      <p>From: {props.startDistance.text} from your starting point</p>
      <p>To: {props.endDistance.text} from your destination</p>
      <p>Time: {props.driverInfo.driver_route.time} </p>
      <button className='secondary-btn'>Select Driver</button>
    </div>
  )
}

export default DriverCard;