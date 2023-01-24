import { Component } from 'react';
import React from 'react';
import axios from 'axios';

class HelloWorld extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
      message: "Hello World"
    }
  }

  componentDidMount() {
    if (this.state.isTrue) {
      axios.get('/')
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