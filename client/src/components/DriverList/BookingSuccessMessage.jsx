import React from 'react';
import { HiCheckCircle } from "react-icons/hi";

const BookingSuccessMessage = () => {

  return (
    <div className='modal trans-bg display-block'>
      <div className='popup-container'>
        <HiCheckCircle />
        <p>You successfully booked the driver!</p>
      </div>
      <div className='dark-space'></div>
    </div>
  )
}

export default BookingSuccessMessage;