import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function PasswordReset(props) {
  const [email, setEmail] = useState('');
  const [tempPass, setTempPass] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='auth-form-container'>
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
        <button className='verification-btn'><span className='verification-text'>Send Verification Code</span></button>
        <Link to='/'>
          <button className='back-btn'><span className='back-text'>Go Back</span></button> 
        </Link> 
      </div>
    </div>
  )
}; 