import React, { useState } from 'react';
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
      <div className="licenseModal">
        <div className="licenseModalContent">
        <h4>To sign up as a driver with EcoDrive, please update your record with your license information:</h4>
        <div><input type="text" name="license" style={{ width: "90%" }} placeholder="Driver's license number" onChange={(e) => setLicense(e.target.value)}/> <br/></div>
        <div><input type="text" name="license" style={{ width: "90%" }} placeholder="License plate" onChange={(e) => setPlate(e.target.value)}/> <br/></div>
        <button type="Submit" className="submitLicenseModal"onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default DriverPrompt;