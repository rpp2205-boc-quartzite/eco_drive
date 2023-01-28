import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate=useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/login', {email, pass})
        .then((result) => {
          navigate('/driverview');
        })
    }

    return (
        <div className='auth-form-container'>
          <form className='login-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
              <label htmlFor='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}type='email' placeholder='Enter Email' id='email' name='email' />
              <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='Enter Password' id='password' name='password' />
                <button type='submit'>Log In</button>
            <Link to='/register'>
              <button className='link-btn'>Don't have an account? Sign Up here.</button>
            </Link>  
          </form>
        </div>
    )
}