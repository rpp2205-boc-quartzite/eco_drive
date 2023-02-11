import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class DriverRecentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      // wholeReviewerObj: {}
      wholeReviewerObj: {
        data: []
      }
    }
  }

  componentDidMount () {
    var id = this.props.id;
    console.log('RECENT CARD HCELSEA IDDDD', id)
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      console.log('result in driverrecentcard!!!', result)
      this.setState({
        avatar: result.data[0].avatar,
        wholeReviewerObj: result
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('this.props.wholeObj', this.props.wholeObj)
    if (this.state.wholeReviewerObj.data[0] === undefined) {
      console.log('revieweeData undefined');
      return null;
    } else {
    return (
      <div>
          <Link to="/ratings-reviews" state={{userData: this.props.wholeObj, revieweeData: this.state.wholeReviewerObj, from: 'driver-view', view: 'driver'}}>
          {this.state.avatar ?
          <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/> :
          <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/>
        }</Link>

        </div>
      )
    }
  }
}

export default DriverRecentCard;