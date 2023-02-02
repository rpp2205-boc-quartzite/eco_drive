import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='first-view'>
        <div className='title-frame'>
          <div className='logo-frame'>
            <h1 className='eco-title'>EcoDrive</h1>
          </div>
          <h2 className='eco-subtitle'>Think globally, carpool locally</h2>
        </div>
        <div className='link-frame'>
          <Link to='/register'>
            <button className='signup-btn'><span className='sign-up-link'>Sign Up</span></button>
          </Link>
          <Link to='/login'>
            <button className='login-btn' type='link'><span className='login-btn-link'>Login</span></button>
          </Link>
        </div>
      </div>
    )}
};

export default Dashboard;