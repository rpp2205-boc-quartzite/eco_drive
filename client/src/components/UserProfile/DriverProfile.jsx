import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/Ai';
import { MdLogout } from 'react-icons/Md';
import { HiOutlineRefresh } from 'react-icons/Hi';
import { FaPen } from 'react-icons/Fa';

class DriverProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '63d36d4bcd478f26557c4a30', //hardcoded for now
      full_name: '',
      email: '',
      start_address: '',
      end_address: '',
      time: '',
      total_seats: '',
      avatar: ''
    };
  }

  componentDidMount () {
    var id = this.state.userId;
    axios.get('/getDriverView', { params: {id} })
    .then((result) => {
      console.log('got da driver', result)
      this.setState({
        full_name: result.data[0].full_name,
        email: result.data[0].email,
        start_address: result.data[0].driver_route.start_address,
        end_address: result.data[0].driver_route.end_address,
        time: result.data[0].driver_route.time,
        avatar: result.data[0].avatar
      })
    })
    .catch(err => console.log(err))
  }

  render () {
    return (
      <div>
      {/* TOP BUTTONS */}
        <span className='profileToggle'>Rider</span>
        <span className='profileToggleButton'><HiOutlineRefresh/></span>
        <span className='profileLogoutButton'><MdLogout /></span>
        <span className='profileHomeButton'><AiFillHome/></span>

      {/* PROFILE PHOTO */}
        <div className='profilePhotoDiv'>
          <img className='profilePhoto' src={this.state.avatar} alt="drive image"/>
          {/* REMINDER: replace w/ user profile later */}
        </div>
        <div className='profileName'>
         {this.state.full_name} <span className='profileOnline'>&#183;</span>
        </div>

      {/* RATING STARS */}
        <div className='profileRatingStars'>
          &#9733; &#9733; &#9733; &#9733; &#9733;
        </div>

      {/* UPDATE PROFILE */}
        <div className='profileButton'> <button className='profileUpdateButton'>
          Update Profile <FaPen
            size="10px"
            color="green" />
        </button></div>

      {/* REVIEWS */}
        <div className='profileReviewDiv'>
          <span className='profileTitle'>Reviews</span>
          <div className='profileReviewBox'>
            <div className='profileReviewerName'>Amy Johnson</div>
            <div>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
            <div className='profileReviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className='profileReviewDate'>1/26/23</div>
          </div>
        </div>

      {/* RECENT DRIVERS */}
        <div>
          <span className='profileTitle'>Recent drivers</span>
        </div>

      {/* CURRENT ROUTE */}
        <div>
          <span className='profileTitle'>Current route</span>
          <div className='profileCurrentRoute'>
            <div className='profileCurrentRouteTitle'>From:</div>
            <div className='profileCurrentRouteInfo'>{this.state.start_address}</div>
            <div className='profileCurrentRouteTitle'>To:</div>
            <div className='profileCurrentRouteInfo'>{this.state.end_address}</div>
            <div className='profileCurrentRouteTitle'>Time:</div>
            <div className='profileCurrentRouteInfo'>{this.state.time}</div>

          </div>
        </div>

      {/* PREVIOUS ROUTE */}
        <div>
          <span className='profileTitle'>Previous routes</span>
        </div>

      {/* SAVINGS THIS MONTH */}
      <div>
          <span className='profileTitle'>Your savings this month</span>
        </div>

      </div>
    )
  }
}

export default DriverProfile;