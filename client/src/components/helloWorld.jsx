import { Component } from 'react';
import React from 'react';
import axios from 'axios';

class HelloWorld extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      message: "Hello World"
    }
  }

  componentDidMount() {
    console.log('this is a test');
    if (this.state.isTrue) {
      console.log('this is another test');
      axios.get('/goodbye')
      .then(response => {
        this.setState({
          message: response.data
        }, () => { console.log(this.state.message) })
      })
      .catch(function (error) {
        console.error(error);
      })
    }
  }

  render() {
    return (
      <div>{this.state.message}</div>
    )
  }
}

export default HelloWorld;