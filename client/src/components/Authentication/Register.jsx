import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [full_name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [drivers_license, setDl] = useState('');
  const [license_plate, setlicensePlate] = useState('');
  const [driverCheck, setDriverCheck] = useState('');
  const navigate=useNavigate();

  const handleNext = (event) => {
    event.preventDefault();

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPass) {
      setPass('');
      setConfirmPass('');
      return alert('Password does not match!');
    }

    if (drivers_license === '') {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, is_driver: false})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          alert('Email already in use.');
        })
    } else {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, is_driver: true})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          alert('Email already in use.');
        });
    }; 
  }

  return (
    <div className='signup-form-container'>
        <form className='sign-form' onSubmit={handleSubmit}>
          <div className='inner-fields'>
            <h2 className='signup-title'>Sign Up</h2>
            <label htmlFor='name'>Your Name</label>
            <input value={full_name} name='name' onChange={(event) => setName(event.target.value)} id='name' required />
            <label htmlFor='email' className='signup-label'>Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' id='email' name='email' required/>
            <label htmlFor='dob' className='signup-label'>Date of Birth</label>
              <input  value={dob} onChange={(event) => setDob(event.target.value)} type='date' placeholder='mm/dd/yyyy' id='dob' name='dob' required/>
            {/* <label htmlFor='dl'>Driver's License #</label>
              <input  value={drivers_license} onChange={(event) => setDl(event.target.value)} type='text' id='dl' name='dl'/>
            <label htmlFor='licensePlate'>License Plate #</label>
              <input  value={license_plate} onChange={(event) => setlicensePlate(event.target.value)} type='text' id='licensePlate' name='licensePlate'/>                             */}
            <label htmlFor='password' className='signup-label'>Password</label>
              <input value={password} onChange={(event) => setPass(event.target.value)} type='password' id='password' name='password' required/>
            <label htmlFor='confirmPass' className='signup-label'>Confirm Password</label>
              <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='Confirmpass' name='Confirmpass' required/>
          </div>
            <input type="checkbox" id="checkbox" required/>
              <label htmlFor="checkbox">I agree to Terms of Service </label>
      </form>
      <button type='submit' onClick={handleSubmit}>Next</button> 
      <Link to='/login'>
        <button className='link-btn'>Already have an account? Login here.</button> 
      </Link>  
  </div>
  )
};