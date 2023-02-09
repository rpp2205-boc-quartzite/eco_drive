import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class RiderRecentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    }
  }

  componentDidMount () {
    var id = this.props.id;
    console.log('IDDDD', id)
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      console.log('ID!!!', result)
      this.setState({
        avatar: result.data[0].avatar
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('this.props.wholeObj', this.props.wholeObj)
    return (
      <div>
          <Link to="/ratings-reviews" state={{userData: this.props.wholeObj, revieweeData: this.props.id, from: 'rider-view'}}>
          {this.state.avatar ?
          <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/> :
          <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/>
        }</Link>

        </div>

      )

  }
}

export default RiderRecentCard;