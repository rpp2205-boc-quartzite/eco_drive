import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <div className='auth-form-container'>
            <h2>Register</h2>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input value={name} name='name' onChange={(event) => setName(event.target.value)} id='name' placeholder='Enter Full Name' />
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)}type='email' placeholder='Enter Email' id='email' name='email' />
            <label htmlFor='password'>Password</label>
            <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='Enter Password' id='password' name='password' />
            <button type='submit'>Log In</button>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}