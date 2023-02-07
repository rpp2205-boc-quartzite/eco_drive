import React from 'react';
import { FiInfo } from "react-icons/fi";

const DriverCard = (props) => {

  return (
    <div className='card'>
      <div className='card-header'>
        <img className='avatar' src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="Driver Avatar" />
        <p>Suzy Thomas</p>
        <FiInfo className='info-icon'/>
      </div>
      <p>From: from your starting point</p>
      <p>To: from your destination</p>
      <p>Time: </p>
      <button className='secondary-btn'>Select Driver</button>
    </div>
  )
}

export default DriverCard;