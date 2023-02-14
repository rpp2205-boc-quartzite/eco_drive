import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class DriverRecentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      wholeReviewerObj: {
        data: []
      }
    }
  }

  componentDidMount () {
    var id = this.props.id;
    console.log('RECENT CARD HCELSEA IDDDD', typeof id)
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      // console.log('ID!!!', result)
      this.setState({
        avatar: result.data[0].avatar,
        wholeReviewerObj: result
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('this.props.wholeObj', this.props.wholeObj)
    return (
      <div>
          <Link to="/ratings-reviews" state={{userData: this.props.wholeObj.data[0], revieweeData: this.state.wholeReviewerObj.data[0], from: 'driverprofile', view: 'driver'}}>
            <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/>
          </Link>

        </div>
      )
    }
}

export default DriverRecentCard;