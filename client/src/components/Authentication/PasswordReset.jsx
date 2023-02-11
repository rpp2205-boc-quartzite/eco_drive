import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PasswordReset(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [request, setRequest] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [pendingEmail, setPendingEmail] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [tokenCheck, setTokenCheck] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [confirmPassCheck, setConfirmPassCheck] = useState(false);
  const [missToken, setMissToken] = useState(false);
  const navigate = useNavigate();

  const generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    };
    return OTP;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== '') {
      axios.get(`/unique-email-check?email=${email}`)
      .then((user) => {
        if (user.data.email !== undefined) {
          var code = generateOTP();
          setRequest(null);
          setPendingEmail(true);
          axios.post('/sendMail', {email: email, code: code})
            .then((result) => {
              setVerifyToken(code);
              setPendingEmail(false);
              setRequest(true);
            })
            .catch((err) => {
              alert('Something went wrong!');
              console.log(err);
            })
        } else {
          setEmailCheck(true);
        };
      })
      .catch((err) => {
        console.log(err);
      });  
    };
  };

  const submitReset = (event) => {
    event.preventDefault();
    if (inputToken === '') {
      setMissToken(true);
      return;
    };
    if (verifyToken !== inputToken) {
      setTokenCheck(true);
      return;
    };
    if (password === '' || confirmPass === '') {
      passMatch(false);
      setPassCheck(true);
      setConfirmPassCheck(true);
    }
    if (password !== confirmPass) {
      setPassMatch(true);
      return;
    };

    axios.put('/change-password', {email: email, password: password})
      .then((result) => {
        navigate('/');
        navigate('/login');
      })
      .catch((err) => {
        alert('Something went wrong!');
        console.log(err);
      });
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
                  {missToken === true &&
                      <div className='error-message'><span className='error-text'>Please enter verification code</span></div>}  
                  {emailCheck === true &&
                      <div className='error-message'><span className='error-text'>Email not found. No code sent</span></div>}
                </div>
                <input className='input-field' value={email} onChange={(event) => setEmail(event.target.value)}type='email' id='email' name='email' />
              </div>
            </div>
          </form>
          <p className='pass-note'>*We will send you a verification code to your email. Please have it available for the next step!</p>
          </div>
          <div className='link-frame'>
            <button className='primary-btn' onClick={handleSubmit}>Send Verification Code</button>
            <Link to='/'>
              <button className='back-btn'><span className='back-text'>Go Back</span></button>
            </Link>
          </div>
        </div>}
      {pendingEmail === true &&
        <div className='loading-screen'>
          <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
          <p>Sending Verification Token...</p>
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
                    {tokenCheck === true &&
                      <div className='error-message'><span className='error-text'>Incorrect Verification Code</span></div>}
                  </div>
                  <input className='input-field' value={inputToken} onChange={(event) => setInputToken(event.target.value)}type='text' id='inputToken' name='inputToken' />
                </div>
                <div className='label-container-reset'>
                  <div className='label-title-container-pass'>
                    <label className='verify-code-pass'>New Password</label>
                    <div className='valid-check-pass'>*</div>
                    {passMatch === true && 
                      <div className='error-message'><span className='error-text'>Password does not match</span></div>}
                    {passCheck === true &&
                      <div className='error-message'><span className='error-text'>Please enter a password</span></div>}   
                  </div>
                  <input className='input-field' value={password} onChange={(event) => setPassword(event.target.value)} type='password' id='password' name='password' />
                </div>
                <div className='label-container-reset'>
                  <div className='label-title-container-pass'>
                    <label className='verify-code-confirm'>Confirm Password</label>
                    <div className='valid-check-pass'>*</div>
                    {passMatch === true && 
                      <div className='error-message'><span className='error-text'>Password does not match</span></div>}
                    {confirmPassCheck === true &&
                      <div className='error-message'><span className='error-text'>Please enter a password</span></div>}   
                  </div>
                  <input className='input-field' value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' id='passConfirm' name='passConfirm' />
                </div>
              </div>
            </form>
          </div>
          <div className='link-frame'>
            <button className='primary-btn' onClick={submitReset}>Reset Password</button>
            <button className='back-btn' onClick={(event) => setRequest(false)}><span className='back-text'>Go Back</span></button>
          </div>
        </div>
      }
    </div>
  )
};