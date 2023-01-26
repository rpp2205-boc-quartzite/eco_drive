import { Component } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class HelloWorld extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
      message: "Welcome to EcoDrive"
    }
  }

  componentDidMount() {
    if (this.state.isTrue) {
      axios.get('/goodbye')
      .then(response => {
        this.setState({
          message: response.data
        })
      })
      .catch(function (error) {
        console.error(error);
      })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <Link to="/driverview">
        <button>Go to Default Driver View Page</button>
        </Link>
      </div>
    )
  }
}

export default HelloWorld;