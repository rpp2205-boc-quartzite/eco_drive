import React from 'react';

const DriverConfirmation = (props) => {

  return (
    <div className='modal trans-bg display-block'>
      <div className='driver-confirmation-container'>
        <img src={props.avatar} alt="" />
        <p>{props.full_name}</p>
        <p>Pickup: {props.driver_route.start_address}</p>
        <p>Licese Plate #: {props.license_plate}</p>
        <p>Time: {props.driver_route.time}</p>
      </div>
    </div>
  )
}

export default DriverConfirmation;