import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SignUpSelect from './SignUpSelect.jsx';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [selected, setSelected] = useState(true);
  const [favorite, setFavorite] = React.useState('');

  const handleDriverChange = () => {
    setFavorite('driver');
  };

  const handleRiderChange = () => {
    setFavorite('rider');
  };  
  const handleSubmit = (event) => {
      event.preventDefault();
      setSelected(false);
  }

  return (
    <div className='signup-form-container'>
        <form className='sign-form' onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
            <SignUpSelect handleDriverChange={handleDriverChange} handleRiderChange={handleRiderChange} favorite={favorite}/>          
            <label htmlFor='name'>Your Name</label>
              <input value={name} name='name' onChange={(event) => setName(event.target.value)} id='name' />
            <label htmlFor='email'>Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' id='email' name='email' />
            <label htmlFor='dob'>Date of Birth</label>
              <input  value={dob} onChange={(event) => setDob(event.target.value)} type='date' placeholder='mm/dd/yyyy' id='dob' name='dob'/>
            <label htmlFor='password'>Password</label>
              <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' id='password' name='password' />
            <label htmlFor='confirmPass'>Confirm Password</label>
              <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='Confirmpass' name='Confirmpass' />
            <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">I agree to Terms of Service </label>
            <button type='submit' onClick={handleSubmit}>Next</button> 
          <Link to='/login'>
            <button className='link-btn'>Already have an account? Login here.</button> 
          </Link>  
      </form>
  </div>
  )
};