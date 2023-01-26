import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>EcoDrive</h1>
        <Link to='/register'>
          <button>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    )}
};

export default Dashboard;