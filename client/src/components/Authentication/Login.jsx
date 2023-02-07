import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      props.authCheck(email, pass);
    }

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
                  </div>
                  <input className='input-field' value={email} onChange={(event) => setEmail(event.target.value)}type='email' id='email' name='email' />                  
                </div>
                <div className='label-container-2'>
                  <div className='label-title-container'>
                    <label className='label-title-5' htmlFor='password'>Password</label>
                    <div className='valid-check'>*</div>
                  </div>
                  <input className='input-field' value={pass} onChange={(event) => setPass(event.target.value)} type='password' id='password' name='password' />
                </div>
                <div className='forgot-btn'>
                  <Link to='/password-reset'>
                    <button className='forgot-btn'><span className='forgot-text'>Forgot Password?</span></button>  
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className='signup-btn-wrapper'>
            <button className='next-btn' type='submit' onClick={handleSubmit}><span className='login-text'>Log In</span></button>
            <Link to='/'>
              <button className='back-btn'><span className='back-text'>Go Back</span></button> 
            </Link> 
          </div>
        </div>
    )
}