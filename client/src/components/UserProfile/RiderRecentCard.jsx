import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class RiderRecentCard extends React.Component {
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
    // console.log('IDDDD', id)
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
    // //console.log('this.props.wholeObj', this.props.wholeObj)
    // //console.log('HEY BRANDON', this.state.wholeReviewerObj)
    // return (
    //   <div>
    //       <Link to="/ratings-reviews" state={{userData: this.props.wholeObj, revieweeData: this.state.wholeReviewerObj, from: 'rider-view', view: 'rider'}}>
    //       {this.state.avatar ?
    //       <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/> :
    //       <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/>
    //     }</Link>
    // console.log('userData: ', this.props.wholeObj.data[0]);
    // console.log('revieweeData: ', this.state.wholeReviewerObj.data[0]);
    if (this.state.wholeReviewerObj.data[0] === undefined) {
      console.log('revieweeData undefined', this.state.wholeReviewerObj.data[0]);
      return null;
    } else {
      return (
        <div>
          <Link to="/ratings-reviews" state={{userData: this.props.wholeObj.data[0], revieweeData: this.state.wholeReviewerObj.data[0], from: 'riderprofile', view: 'rider'}}>
            {
              this.state.avatar
              ?  <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/>
              :  <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/>
            }
          </Link>
        </div>
      )
    }
  }
}

export default RiderRecentCard;