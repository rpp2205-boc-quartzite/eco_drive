import React, { useState, useEffect } from "react";
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
  const [age, setAge] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [confirmPassCheck, setConfirmPassCheck] = useState(false);
  const [passMatch, setPassMatch] = useState(true);
  const [emailInUse, setEmailInUse] = useState(false);
  const [currentAge, setCurrentAge] = useState(18);
  const [changeEmail, setChangeEmail] = useState(false);
  
  const calculateAge = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    return age
  };

  const emailChecker = () => {
    if (email !== '') {
      axios.get(`/unique-email-check?email=${email}`)
      .then((user) => {
        if (user.data.email !== undefined) {
          setEmailCheck(false);
          setEmailInUse(true);
          return;
        } else {
          setDriverCheck(true);
        };
      })
      .catch((err) => {
        console.log(err);
      });  
    };
  };

  const handleNext = (event) => {
    event.preventDefault();
    const ageDate = new Date(dob);
    const trueAge = calculateAge(ageDate);

    if (full_name === '' || email === '' || (trueAge < 18 || isNaN(trueAge)) || password === '' || confirmPass === '') {
      if (full_name === '') {
        setNameCheck(true);
      };
      if (email === '') {
        setEmailCheck(true);
      };
      if (isNaN(trueAge)) {
        setAge(false);
        setAgeCheck(true);
      };
      if (trueAge < 18) {
        setAgeCheck(false);
        setAge(true);
      };
      if (trueAge >= 18) {
        console.log('here')
        setAgeCheck(false);
        setAge(false);
      };
      if (password !== confirmPass) {
        setPass('');
        setConfirmPass('');
        setPassMatch(false);
        return;
      }
      if ((password === '' || confirmPass === '')) {
        setPassMatch(true);
        setPassCheck(true);
        setConfirmPassCheck(true);
      };

      return;
    };

    if (tosCheck === false) {
      return alert('Please agree to Terms of Service so we can harvest your data.');
    };

    emailChecker(); 
  };

  const handleAvatar = (event) => {
    event.preventDefault();
    setDriverCheck(null);
    setAvatar(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (drivers_license === '') {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: false, is_rider: true})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post('/register', { email, password, full_name, dob, drivers_license, license_plate, avatar, is_driver: true, is_rider: false})
        .then((result) => {
          props.authCheck(email, password);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

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
                    {nameCheck === true &&
                      <div className='error-message'><span className='error-text'>Please input your name</span></div>}
                  </div>
                  <input 
                    className='input-field' 
                    value={full_name} 
                    name='name' 
                    onChange={(event) => {setName(event.target.value); setNameCheck(false)}} 
                    id='name' 
                    required />
                </div>
                <div className='label-container-2'>
                  <div className='label-title-container'>
                    <label htmlFor='email' className='label-title-3'>Email</label>
                    <div className='valid-check'>*</div>
                    {emailCheck === true &&
                      <div className='error-message'><span className='error-text'>Please input your email</span></div>}
                    {emailInUse === true &&
                      <div className='error-message'><span className='error-text'>Email already in use</span></div>}  
                  </div>
                  <input 
                    className='input-field' 
                    value={email} 
                    onChange={(event) => {
                      setEmail(event.target.value.toLowerCase()); 
                      setEmailCheck(false);
                      setEmailInUse(false);
                    }} 
                    type='email' 
                    id='email' 
                    name='email' 
                    required/>
                </div>
                <div className='label-container-3'>
                  <div className='label-title-container'>
                    <label htmlFor='dob' className='label-title-4'>Date of Birth</label>
                    <div className='valid-check'>*</div>
                    {age === true && 
                      <div className='error-message'><span className='error-text'>You must be over 18 years old</span></div>}
                    {ageCheck === true && 
                      <div className='error-message'><span className='error-text'>Please enter valid date of birth</span></div>}  
                  </div>
                  <input 
                    className='input-field' 
                    value={dob} 
                    onChange={(event) => {
                      setDob(event.target.value); 
                      setAgeCheck(false);
                      setAge(false);
                    }} 
                    type='date' 
                    placeholder='mm/dd/yyyy' 
                    id='dob' 
                    name='dob' 
                    required/>
                </div>
                <div className='label-container-4'>
                  <div className='label-title-container'>
                    <label htmlFor='password' className='label-title-5'>Password</label>
                    <div className='valid-check'>*</div>
                    {passMatch === false &&
                      <div className='error-message'><span className='error-text'>Password does not match</span></div>}
                    {passCheck === true &&
                      <div className='error-message'><span className='error-text'>Please enter a password</span></div>}  
                  </div>
                  <input 
                    className='input-field' 
                    value={password} 
                    onChange={(event) => {
                      setPass(event.target.value); 
                      setPassCheck(false); 
                      setConfirmPassCheck(false)
                    }} 
                    type='password' 
                    id='password' 
                    name='password' 
                    required/>
                </div>
                <div className='label-container-5'>
                  <div className='label-title-container'>
                    <label htmlFor='confirmPass' className='signup-label'>Confirm Password</label>
                    <div className='valid-check'>*</div>
                    {passMatch === false &&
                      <div className='error-message'><span className='error-text'>Password does not match</span></div>}
                    {confirmPassCheck === true &&
                      <div className='error-message'><span className='error-text'>Please enter a password</span></div>}   
                  </div>
                  <input 
                    className='input-field' 
                    value={confirmPass} 
                    onChange={(event) => {setConfirmPass(event.target.value); setConfirmPassCheck(false)}} 
                    type='password' 
                    id='Confirmpass' 
                    name='Confirmpass' 
                    required/>
                </div>
              </div>
              </form>
              <div className='tos-wrapper'>
                  <input 
                    className='tos-checkbox' 
                    type="checkbox" 
                    id="checkbox" 
                    onClick={(event) => setTosCheck(!tosCheck)}
                    required/>
                  <label className='tos-text' htmlFor="checkbox">I agree to Terms of Service {tosCheck === false &&<span className='valid-check-tos'>*</span>}</label>
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