import { Component } from 'react';
import axios from 'axios';

class HelloWorld extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isTrue: false,
      message: "Hello World"
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
      <div>{this.state.message}</div>
    )
  }

}

export default HelloWorld;