import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <div className='auth-form-container'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}type='email' placeholder='Enter Email' id='email' name='email' />
                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='Enter Password' id='password' name='password' />
                <button type='submit'>Log In</button>
            </form>
            <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}