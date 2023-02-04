import React from 'react';

const DriverConfirmation = ({driverInfo, userRouteInfo, toggleDriverConfirmation, startDistance, endDistance, toggleSuccessMessage, updateRiderOnGoingRoute}) => {

  return (
    <div className='modal trans-bg display-block'>
      <div className='popup-container'>
        <div className='confirmation-header'>
          <h3>Confirmation</h3>
          <img className='big-avatar' src={driverInfo.avatar} alt="" />
          <h4>{driverInfo.full_name}</h4>
        </div>
        <div className='confirmation-info'>
          <p>Pickup: {driverInfo.driver_route.start_address}</p>
          <p>Licese Plate #: {driverInfo.license_plate}</p>
          <p>Time: {driverInfo.driver_route.time}</p>
        </div>
        <div className='btn-horizontal-flex'>
          <button className='cancel-btn' onClick={() => {toggleDriverConfirmation()}}>Cancel</button>
          <button
            className='primary-btn'
            onClick={() => {
              toggleDriverConfirmation()
              toggleSuccessMessage();
              const timeoutId = setTimeout(()=>{
                toggleSuccessMessage();
                updateRiderOnGoingRoute(driverInfo, userRouteInfo, startDistance, endDistance);
              }, 1500)
              return () => clearTimeout(timeoutId);
            }}>Book Driver</button>
        </div>
      </div>
      <div className='dark-space' onClick={() => {toggleDriverConfirmation()}}></div>
    </div>
  )
}

export default DriverConfirmation;

