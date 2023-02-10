import React from 'react';

const DriverConfirmation = ({driverInfo, userRouteInfo, startDistance, endDistance, toggleDriverConfirmation, toggleSuccessMessage, updateRiderOnGoingRoute}) => {

  return (
    <div className='modal trans-bg display-block'>
      <div className='popup-container'>
        <div className='confirmation-header'>
          <h4>Confirmation</h4>
          <img className='big-avatar' src={driverInfo.avatar} alt="" />
          <h5>{driverInfo.full_name}</h5>
        </div>
        <div className='confirmation-info'>
          <p>Pickup: {driverInfo.driver_route.start_address}</p>
          <p>Licese Plate #: {driverInfo.license_plate}</p>
          <p>Time: {driverInfo.driver_route.time}</p>
        </div>
        <div className='btn-horizontal-flex'>
          <button className='cancel-btn btn-flex-grow' onClick={() => {toggleDriverConfirmation('off')}}>Cancel</button>
          <button
            className='primary-btn btn-flex-grow'
            onClick={() => {
              toggleDriverConfirmation('off')
              toggleSuccessMessage();
              const timeoutId = setTimeout(()=>{
                toggleSuccessMessage();
                updateRiderOnGoingRoute(driverInfo, userRouteInfo, startDistance, endDistance);
              }, 1500)
              return () => clearTimeout(timeoutId);
            }}>Book Driver</button>
        </div>
      </div>
      <div className='dark-space' onClick={() => {toggleDriverConfirmation('off')}}></div>
    </div>
  )
}

export default DriverConfirmation;

