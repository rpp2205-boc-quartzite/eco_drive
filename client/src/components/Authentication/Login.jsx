import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [passCheck, setPassCheck] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (email === '') {
        setEmailCheck(true);
      };
      if (pass === '') {
        setPassCheck(true);
      };
      if (pass !== '' && email !== '') {
        props.authCheck(email, pass);
      };
      return;
    };

    return (
        <div className='auth-form-container'>
          <div className='login-wrapper'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h2 className='login-title'>Login</h2>
              <div className='inner-fields-3'>
                <div className='label-container'>
                  <div className='label-title-container'>
                    <label className='label-title-3' htmlFor='email'>Email</label>
                    <div className='valid-check'>*</div>
                    {emailCheck === true &&
                      <div className='error-message'><span className='error-text'>Please input your email</span></div>}
                  </div>
                  <input 
                    className='input-field' 
                    value={email} 
                    onChange={(event) => {
                      setEmail(event.target.value.toLowerCase());
                      setEmailCheck(false);
                      }}
                      type='email' 
                      id='email' 
                      name='email' />
                </div>
                <div className='label-container-2'>
                  <div className='label-title-container'>
                    <label className='label-title-5' htmlFor='password'>Password</label>
                    <div className='valid-check'>*</div>
                    {passCheck === true &&
                      <div className='error-message'><span className='error-text'>Please input your password</span></div>}
                  </div>
                  <input 
                    className='input-field' 
                    value={pass} 
                    onChange={(event) => {
                      setPass(event.target.value);
                      setPassCheck(false);
                      }} 
                      type='password' 
                      id='password' 
                      name='password' />
                </div>
                <div className='forgot-btn'>
                  <Link to='/password-reset'>
                    <button className='forgot-btn' type='button'><span className='forgot-text'>Forgot Password?</span></button>
                  </Link>
                </div>
              </div>
              {props.loginFailure === true && 
                <div className='login-error-message'>Incorrect email or password. Try again.</div>}
            </form>
          </div>
          <div className='link-frame'>
            <button className='primary-btn' type='submit' onClick={handleSubmit}>Log In</button>
            <Link to='/'>
              <button className='back-btn'><span className='back-text'>Go Back</span></button>
            </Link>
          </div>
        </div>
    )
}