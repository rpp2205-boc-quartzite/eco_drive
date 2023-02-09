import React from 'react';
import { RiCheckboxCircleFill } from "react-icons/ri";

const BookingSuccessMessage = () => {

  return (
    <div className='modal trans-bg display-block'>
      <div className='popup-container'>
        <RiCheckboxCircleFill className='success-icon'/>
        <p className='success-message-text'>You successfully booked the driver!</p>
      </div>
      <div className='dark-space'></div>
    </div>
  )
}

export default BookingSuccessMessage;