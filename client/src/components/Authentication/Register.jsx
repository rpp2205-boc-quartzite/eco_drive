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
  const [tosCheck, setTosCheck] = useState(false);

  const navigate=useNavigate();

  const calculateAge = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    return age
  }

  const handleNext = (event) => {
    event.preventDefault();
    if (email === '' || full_name === '' || dob === '') {
      return alert('Please complete empty fields');
    };

    const ageDate = new Date(dob);

    if (calculateAge(ageDate) < 21) {
      return alert('You must be over 21 to use this application.');
    }

    if (password !== confirmPass) {
      setPass('');
      setConfirmPass('');
      return alert('Password does not match!');
    }

    if (tosCheck === false) {
      return alert('Please agree to Terms of Service so we can harvest your data.');
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
      console.log(email)
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: false, is_rider: true})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          alert('Email already in use.');
        })
    } else {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: true, is_rider: false})
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
        <div className='signup-wrappers'>
          <div className='sign-tos-wrapper'>
            <form className='sign-form' onSubmit={handleNext}>
              <div className='inner-fields'>
                <h2 className='signup-title'>Sign Up</h2>
                <div className='label-container'>
                  <div className='label-title-container'>
                    <label htmlFor='name' className='label-title-2'>Name</label>
                    <div className='valid-check'>*</div>
                  </div>
                  <input className='input-field' value={full_name} name='name' onChange={(event) => setName(event.target.value)} id='name' required />
                </div>
                <div className='label-container-2'>
                  <div className='label-title-container'>
                    <label htmlFor='email' className='label-title-3'>Email</label>
                    <div className='valid-check'>*</div>
                  </div>
                  <input className='input-field' value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())} type='email' id='email' name='email' required/>
                </div>
                <div className='label-container-3'>
                  <div className='label-title-container'>
                    <label htmlFor='dob' className='label-title-4'>Date of Birth</label>
                    <div className='valid-check'>*</div>
                  </div>
                  <input className='input-field' value={dob} onChange={(event) => setDob(event.target.value)} type='date' placeholder='mm/dd/yyyy' id='dob' name='dob' required/>
                </div>
                <div className='label-container-4'>
                  <div className='label-title-container'>
                    <label htmlFor='password' className='label-title-5'>Password</label>
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
              <div className='tos-wrapper'>
                  <input className='radioInput' type="checkbox" id="checkbox" onClick={(event) => setTosCheck(true)}required/>
                  <label className='tos-text' htmlFor="checkbox">I agree to Terms of Service </label>
              </div>
          </div>
            <div className='link-frame'>
              <button className='primary-btn' type='submit' onClick={handleNext}>Next</button>
            <Link to='/'>
              <button className='back-btn'><span className='back-text'>Go Back</span></button>
            </Link>
            </div>
        </div>}
      {driverCheck === true &&
        <div className='sign-up-wrappers'>
        <form className='sign-form'>
          <div className='inner-fields-2'>
            <h2 className='signup-title'>Sign Up</h2>
            <div className='label-container'>
              <div className='label-title-container'>
                <label className='signup-label' htmlFor='dl'>Driver's License #</label>
              </div>
              <input className='input-field' value={drivers_license} onChange={(event) => setDl(event.target.value)} type='text' id='dl' name='dl' />
            </div>
            <div className='label-container'>
              <div className='label-title-container-2'>
                <label className='signup-label' htmlFor='licensePlate'>License Plate #</label>
              </div>
              <input className='input-field' value={license_plate} onChange={(event) => setlicensePlate(event.target.value)} type='text' id='licensePlate' name='licensePlate' />
            </div>
            <p className='driver-skip'>* If you are not a driver, press Next to skip.</p>
          </div>
        </form>
        <div className='link-frame'>
          <button className='primary-btn' type='submit' onClick={handleAvatar}>Next</button>
          <button className='back-btn' onClick={(event) => setDriverCheck(false)}><span className='back-text'>Go Back</span></button>
        </div>
      </div>}
        {avatarCheck === true &&
          <AvatarSelect state={avatar} setState={setAvatarValue} setAvatar ={setAvatar} setDriverCheck={setDriverCheck} handleSubmit={handleSubmit}/>}
  </div>
  )
};