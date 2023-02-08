import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DriverPrompt = ({ show, close, userId }) => {
  const [drivers_license, setLicense] = useState('');
  const [license_plate, setPlate] = useState('');

  const handleSubmit = (e) => {
    const licenseInfo = {
      _id: userId,
      drivers_license: drivers_license,
      license_plate: license_plate
    }
    if (drivers_license === '') {
      alert('Please enter your driver\'s license number')
    } else if (license_plate === '') {
      alert('Please enter your license plate number')
    }
    axios.post('/postDriverLicense', { licenseInfo })
    .then((result) => {
      console.log('License info posted')
      close(e);
    })
    .catch(err => console.log(err))
  }

  if (!show) {
    return null;
  } else {
    return (
      // <div className="licenseModal">
      //   <div className="licenseModalContent">
      //   <div className="licenseModalTitle">To sign up as a driver with EcoDrive, please update your record with your license information:</div>
      //   <input className="licenseModalInput1" type="text" placeholder="Driver's license number" onChange={(e) => setLicense(e.target.value)}/>
      //   <input type="text" className="licenseModalInput2" placeholder="License plate" onChange={(e) => setPlate(e.target.value)}/>
      //   {/* <div className="btn-horizontal-flex">
      //     <button type="Submit" className="primary-btn-license-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      //     <Link to="/riderview">
      //       <button className="cancel-btn btn-flex-grow">Cancel</button>
      //     </Link>
      //   </div> */}
      //   <div className="btn-horizontal-flex">
      //     <Link to="/riderview" className="link link-wrap-btn">
      //       <button className="cancel-btn btn-flex-grow">Cancel</button>
      //     </Link>
      //     <button type='submit' onClick={(e) => handleSubmit(e)}  className="primary-btn btn-flex-grow">Submit</button>
      //   </div>
      //   </div>
      // </div>

      <div className='modal trans-bg display-block'>
        <div className='popup-container'>
          <h5>To sign up as a driver with EcoDrive, please update your record with your license information:</h5>
          <div className='modalInputFields'>
            <input className="licenseModalInput" type="text" placeholder="Driver's license number" onChange={(e) => setLicense(e.target.value)}/>
            <input type="text" className="licenseModalInput" placeholder="License plate" onChange={(e) => setPlate(e.target.value)}/>
          </div>
          <div className="btn-horizontal-flex">
            <Link to="/riderview" className="link link-wrap-btn">
              <button className="cancel-btn btn-flex-grow">Cancel</button>
            </Link>
            <button type='submit' onClick={(e) => handleSubmit(e)}  className="primary-btn btn-flex-grow">Submit</button>
          </div>
        </div>
        <Link to="/riderview">
          <div className='dark-space'></div>
        </Link>
      </div>
    )
  }
}

export default DriverPrompt;