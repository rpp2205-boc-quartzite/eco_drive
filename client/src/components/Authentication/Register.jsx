import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AvatarSelect from './AvatarSelect.jsx';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [full_name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [drivers_license, setDl] = useState('');
  const [license_plate, setlicensePlate] = useState('');
  const [driverCheck, setDriverCheck] = useState(false);
  const [avatarCheck, setAvatar] = useState(false);
  const [avatar, setAvatarValue] = useState('');
  const navigate=useNavigate();

  const handleNext = (event) => {
    event.preventDefault();
    if (email === '' || full_name === '' || dob === '') {
      return alert('Please complete form');
    };

    if (password !== confirmPass) {
      setPass('');
      setConfirmPass('');
      return alert('Password does not match!');
    }

    setDriverCheck(true);
  }

  const handleAvatar = (event) => {
    event.preventDefault();
    setDriverCheck(null);
    setAvatar(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (avatar === '') {
      return alert('Please select a photo.');
    }

    if (drivers_license === '') {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: false})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          alert('Email already in use.');
        })
    } else {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: true})
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
      {driverCheck === false && 
        <div>
          <form className='sign-form' onSubmit={handleNext}>
            <div className='inner-fields'>
              <h2 className='signup-title'>Sign Up</h2>
              <div className='label-container'>
                <div className='label-title-container'>
                  <label htmlFor='name' className='label-title'>Name</label>
                  <div className='valid-check'>*</div>
                </div>
                <input className='input-field' value={full_name} name='name' onChange={(event) => setName(event.target.value)} id='name' required />
              </div>
              <div className='label-container-2'>
                <div className='label-title-container'>
                  <label htmlFor='email' className='label-title'>Email</label>
                  <div className='valid-check'>*</div>
                </div>
                <input className='input-field' value={email} onChange={(event) => setEmail(event.target.value)} type='email' id='email' name='email' required/>
              </div>
              <div className='label-container-3'>
                <div className='label-title-container'>
                  <label htmlFor='dob' className='label-title'>Date of Birth</label>
                  <div className='valid-check'>*</div>
                </div>
                <input className='input-field' value={dob} onChange={(event) => setDob(event.target.value)} type='date' placeholder='mm/dd/yyyy' id='dob' name='dob' required/>
              </div>
              <div className='label-container-4'>
                <div className='label-title-container'>
                  <label htmlFor='password' className='label-title'>Password</label>
                  <div className='valid-check'>*</div>
                </div>
                <input className='input-field' value={password} onChange={(event) => setPass(event.target.value)} type='password' id='password' name='password' required/>
              </div>
              <div className='label-container-5'>
                <div className='label-title-container'>
                  <label htmlFor='confirmPass' className='signup-label'>Confirm Password</label>
                  <div className='valid-check'>*</div>
                </div>
                <input className='input-field' value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='Confirmpass' name='Confirmpass' required/>
              </div>
            </div>
            </form>
            <input type="checkbox" id="checkbox" required/>
              <label htmlFor="checkbox">I agree to Terms of Service </label>
            <button type='submit' onClick={handleNext}>Next</button> 
          <Link to='/login'>
            <button className='link-btn'>Already have an account? Login here.</button> 
          </Link> 
        </div>}
      {driverCheck === true &&
        <form className='sign-form'>
          <div className='inner-fields'>
            <h2 className='signup-title'>Sign Up</h2>
            <label htmlFor='dl'>Driver's License #</label>
              <input  value={drivers_license} onChange={(event) => setDl(event.target.value)} type='text' id='dl' name='dl'/>
            <label htmlFor='licensePlate'>License Plate #</label>
              <input  value={license_plate} onChange={(event) => setlicensePlate(event.target.value)} type='text' id='licensePlate' name='licensePlate'/>
            <button type='submit' onClick={handleAvatar}>Next</button>
          </div>
        </form>} 
        {avatarCheck === true && 
          <AvatarSelect state={avatar} setState={setAvatarValue} handleSubmit={handleSubmit}/>}
  </div>
  )
};