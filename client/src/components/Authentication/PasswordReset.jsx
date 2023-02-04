import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PasswordReset(props) {
  const [email, setEmail] = useState('');
  const [tempPass, setTempPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [request, setRequest] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [inputToken, setInputToken] = useState('');

  const generateOTP = () => {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';

    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

  const handleSubmit = (event) => {
    if (email === '') {
      return alert('Please enter valid email.');
    }
    var code = generateOTP();

    axios.post('/sendMail', {email: email, code: code})
      .then((result) => {
        setRequest(true);
      })
      .catch((err) => {
        alert('Something went wrong!');
        console.log(err);
      })
  };

  return (
    <div className='auth-form-container'>
      {request === false &&
        <div>
          <div className='forgot-pass-wrapper'>
          <h2 className='forgot-pass-title'>Forgot Password</h2>
          <form className='forgot-pass-form'>
            <div className='inner-fields-pass'>
              <div className='label-container-pass'>
                <div className='label-title-container-pass'>
                  <label className='label-title-8' htmlFor='email'>Enter your email</label>
                  <div className='valid-check-pass'>*</div>
                </div>
                <input className='input-field' value={email} onChange={(event) => setEmail(event.target.value)}type='email' id='email' name='email' />                  
              </div>
            </div>      
          </form>
          <p className='pass-note'>*We will send you a verification code to your email. Please have it available for the next step!</p>
          </div>
          <div className='pass-btn-wrapper'>
            <button className='verification-btn' onClick={handleSubmit}><span className='verification-text'>Send Verification Code</span></button>
            <Link to='/'>
              <button className='back-btn'><span className='back-text'>Go Back</span></button> 
            </Link> 
          </div>
        </div>}
      {request === true && 
        <div>
          <div className='reset-pass-wrapper'>
            <h2 className='forgot-pass-title'>Reset Password</h2>
            <form className='reset-pass-form'>
              <div className='inner-fields-reset'>
                <div className='label-container-reset'>
                  <div className='label-title-container-pass'>
                    <label className='verify-code-title'>Verification Code</label>
                    <div className='valid-check-pass'>*</div>
                  </div>
                  <input className='input-field' value={inputToken} onChange={(event) => setEmail(event.target.value)}type='text' id='inputToken' name='inputToken' />  
                </div>
                <div className='label-container-reset'>
                  <div className='label-title-container-pass'>
                    <label className='verify-code-pass'>New Password</label>
                    <div className='valid-check-pass'>*</div>
                  </div>
                  <input className='input-field' value={password} onChange={(event) => setPassword(event.target.value)} type='password' id='password' name='password' />
                </div>
                <div className='label-container-reset'>
                  <div className='label-title-container-pass'>
                    <label className='verify-code-confirm'>Confirm Password</label>
                    <div className='valid-check-pass'>*</div>
                  </div>
                  <input className='input-field' value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='passConfirm' name='passConfirm' />
                </div>
              </div>
            </form>
          </div>
          <div className='signup-btn-wrapper'>
            <button className='reset-pass-btn'><span className='reset-pass-text'>Reset Password</span></button>
            <button className='back-btn' onClick={(event) => setRequest(false)}><span className='back-text'>Go Back</span></button> 
          </div>
        </div>
      }
    </div>
  )
}; 