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
  const navigate=useNavigate();

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
          navigate('/riderview');
        })
        .catch((err) => {
          alert('Email already in use.');
        })
    } else {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, is_driver: true})
        .then((result) => {
          navigate('/driverview');
        })
        .catch((err) => {
          alert('Email already in use.');
        });
    }; 
  }

  return (
    <div className='signup-form-container'>
        <form className='sign-form' onSubmit={handleSubmit}>
          <h2>Sign Up</h2>        
            <label htmlFor='name'>Your Name</label>
              <input value={full_name} name='name' onChange={(event) => setName(event.target.value)} id='name' />
            <label htmlFor='email'>Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' id='email' name='email' />
            <label htmlFor='dob'>Date of Birth</label>
              <input  value={dob} onChange={(event) => setDob(event.target.value)} type='date' placeholder='mm/dd/yyyy' id='dob' name='dob'/>
            <label htmlFor='dl'>Driver's License #</label>
              <input  value={drivers_license} onChange={(event) => setDl(event.target.value)} type='text' id='dl' name='dl'/>
            <label htmlFor='licensePlate'>License Plate #</label>
              <input  value={license_plate} onChange={(event) => setlicensePlate(event.target.value)} type='text' id='licensePlate' name='licensePlate'/>                            
            <label htmlFor='password'>Password</label>
              <input value={password} onChange={(event) => setPass(event.target.value)} type='password' id='password' name='password' />
            <label htmlFor='confirmPass'>Confirm Password</label>
              <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='Confirmpass' name='Confirmpass' />
            <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">I agree to Terms of Service </label>
            <button type='submit' onClick={handleSubmit}>Sign Up</button> 
          <Link to='/login'>
            <button className='link-btn'>Already have an account? Login here.</button> 
          </Link>  
      </form>
  </div>
  )
};