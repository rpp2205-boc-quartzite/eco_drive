import React from 'react';
import axios from 'axios';
import { AiFillHome } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { FaPen, FaCheckCircle} from 'react-icons/fa';
import RiderReviewsList from './RiderReviewsList.jsx';
import Ratings from 'react-ratings-declarative';
import { useLocation, useParams, Link } from "react-router-dom";
import {randomFacts} from './RandomFacts.jsx';

class RiderProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log( 'RIDER PROFILE PROPS', this.props)
    this.state = {
      //userId: this.props.location.state.id,
      userId: '63d36ee5cd478f26557c4a38',
      full_name: '',
      email: '',
      start_address: '',
      end_address: '',
      time: '',
      total_seats: '',
      avatar: '',
      drivers_license: '',
      rider_reviews: [],
      recent_drivers: [],
      rating: 4,
      //hardcoded rating ^ for now
      rider_trips: [],
      editProfile: false,
      infoChangedSuccess: false
    };
    this.editProfileOrClose = this.editProfileOrClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessClosure = this.handleSuccessClosure.bind(this);
  }

  componentDidMount () {
    var id = this.state.userId;
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      console.log('got da rider', result.data[0])
      this.setState({
        full_name: result.data[0].full_name,
        email: result.data[0].email,
        start_address: result.data[0].rider_route.start_address,
        end_address: result.data[0].rider_route.end_address,
        time: result.data[0].rider_route.time,
        avatar: result.data[0].avatar,
        drivers_license: result.data[0].drivers_license,
        rider_reviews: result.data[0].rider_reviews,
        recent_riders: result.data[0].recent_riders
      })
    })
    .catch(err => console.log(err))
  }

  editProfileOrClose() {
    if (this.state.editProfile === true) {
      this.setState({editProfile: false})
      console.log('SET TO FALSE', this.state.editProfile)
    } else {
      this.setState({editProfile: true})
      console.log('SET TO TRUE', this.state.editProfile)
    }
  }

  handleFormChange(event) {
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
  }

  handleSuccessClosure() {
    this.setState({infoChangedSuccess: false})
  }

  handleSubmit(event){
    event.preventDefault()
    console.log('submitted!')
    var editedInfo = {
      userId: this.state.userId,
      full_name: this.state.full_name,
      email: this.state.email
    }
    axios.post('/updateRiderProfile', editedInfo)
      .then((submit) => {
        console.log('successfully submitted changes!', submit, this.state.full_name)
        this.setState({editProfile: false})
        this.setState({infoChangedSuccess: true})
        // console.log(this.state.full_name)
      })
      .catch((err)=> {
        console.log('error submitting changes', err)
      })
  }

  render () {
    console.log('CHECKING RIDER PROPS', this.props.location.state.id)
    return (
      <div>
      {/* TOP BUTTONS */}
        {this.state.drivers_license ?
        // <Link to="/driverprofile">

      <Link
      to="/driverprofile"
      state={{id: this.state.userId}}>
        <span className='profileToggle'>Rider</span>
        <span className='profileToggleButton'><HiOutlineRefresh/></span>
        </Link> : <span>
        <span className='profileToggle'>Rider</span>
        <span className='profileToggleButton'><HiOutlineRefresh/></span></span>
        }

        <Link to="/"><span className='profileLogoutButton'><MdLogout /></span></Link>
        <Link to="/riderview"><span className='profileHomeButton'><AiFillHome/></span></Link>

      {/* PROFILE PHOTO */}
        <div className='profilePhotoDiv'>
          {!this.state.avatar ?
          <img className='profileprofilePhoto' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/> :
          <img className='profileprofilePhoto' src={this.state.avatar} alt="profile avatar"/>
          }
        </div>
        <div className='profileName'>
         {this.state.full_name} <span className='profileOnline'>&#183;</span>
        </div>

      {/* RATING STARS */}
        <div className='profileRatingStars'>
        <Ratings
              rating={this.state.rating}
              widgetRatedColors="#FFB629"
              widgetDimensions="18px"
              widgetSpacings="1px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
        </div>

      {/* UPDATE PROFILE */}
        <div>
          <div className='profileButton'> <button className='profileUpdateButton' onClick={this.editProfileOrClose}>
            Update Profile <FaPen
              size="10px"
              color="green" />
          </button>
          </div>
          {this.state.editProfile ?
          <div className='editProfileForm'>
            <div className='editProfileTitle'>Update Profile</div>

            <div className='editProfileSubTitle'>Name</div>
            <div className='editProfileInputDiv'><input name='full_name' onChange={this.handleFormChange} className='editProfileInput' placeholder={this.state.full_name}/></div>

            <div className='editProfileSubTitle'>Email</div>
            <div className='editProfileInputDiv'><input name='email' onChange={this.handleFormChange} className='editProfileInput' placeholder={this.state.email}/></div>

            <div className='profileButtons'>
              <button className='profileCancelButton' onClick={this.editProfileOrClose}><span className='profileCancelButtonText'></span>Cancel</button>
              <button className='profileSubmitButton'><span onClick={this.handleSubmit} className='profileSubmitButtonText'>Submit</span></button>
            </div>
          </div>
          : null
          }
        </div>

      {/* UPDATE PROFILE SUCCESS MESSAGE */}

      {this.state.infoChangedSuccess ?
      <div className='profileInfoChangeSuccess' onClick={this.handleSuccessClosure}>
        <div className='profileCheck'><FaCheckCircle size="40px"/></div>
        <div className='profileSuccessText'>Your profile is successfully updated!</div>
        </div>
      : null}


      {/* REVIEWS */}
        <div className='profileReviewDiv'>
          <span className='profileTitle'>Reviews</span>
          {this.state.rider_reviews.length === 0 ?
          <div className='profilePlaceholder'>No reviews yet &#129485;</div>
          :
          <RiderReviewsList rider_reviews={this.state.rider_reviews} />
          }
        </div>

      {/* RECENT DRIVERS */}
        <div>
          <span className='profileTitle'>Recent drivers</span>
          <div className='profileRecentDriverContainer'>
          {this.state.recent_drivers.length === 0 ?
          <div className='profilePlaceholder2'>None yet &#129485;</div>
          :
          <Link to="/ratings-reviews">
          {!this.state.avatar ?
          <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/> :
          <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/>
          }</Link>
          }
          </div>
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
          {this.state.rider_trips.length === 0 ?
          <div className='profilePlaceholder2'>None yet &#129485;</div>
          :
          <div className='profileCurrentRoute'>
            <div className='profileCurrentRouteTitle'>From:</div>
            <div className='profileCurrentRouteInfo'>{this.state.start_address}</div>
            <div className='profileCurrentRouteTitle'>To:</div>
            <div className='profileCurrentRouteInfo'>{this.state.end_address}</div>
            <div className='profileCurrentRouteTitle'>Time:</div>
            <div className='profileCurrentRouteInfo'>{this.state.time}</div>
          </div>
          }

        </div>

      {/* SAVINGS THIS MONTH */}
      <div>
          <span className='profileTitle'>Your savings this month</span>
          <div className='profileSavings'>
            <div className='profileSavingsTitle'>You saved the equivalent of</div>
            <div className='profileCurrentRouteInfo'>{(this.state.rider_trips.length + 1) * .05} trees &#127794; <div>or</div> {(this.state.rider_trips.length + 1)* 10} minutes of driving &#128663;</div>
            <div className='profileSavingsTitle'>This translates to</div>
            <div className='profileCurrentRouteInfo'>${(this.state.rider_trips.length + 1)* 5.35} you saved on gas &#9981;</div>
          </div>
          <span className='profileTitle'>Fact of the day</span>
          <div className='profileCurrentRoute'>
            <div className='profileCurrentRouteTitle'>Did you know? &#128173;</div>
            <div className='profileCurrentRouteInfo'>{randomFacts[Math.floor(Math.random() * 16)]}</div>
          </div>
        </div>

      </div>
    )
  }
}

export default () => (
  <RiderProfile params={useParams()} location={useLocation()} />
);