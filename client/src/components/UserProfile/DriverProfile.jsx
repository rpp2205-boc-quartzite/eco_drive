import React from 'react';
import axios from 'axios';
import { AiFillHome } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { TbRefresh } from "react-icons/tb";
import { FaPen, FaCheckCircle} from 'react-icons/fa';
import DriverReviewsList from './DriverReviewsList.jsx';
import Ratings from 'react-ratings-declarative';
import { useLocation, useParams, Link } from "react-router-dom";
import {randomFacts} from './RandomFacts.jsx';

class DriverProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log( 'DRIVER PROFILE PROPS', this.props)
    this.state = {
      //userId: this.props.location.state.id,
      userId: '63d36e8fcd478f26557c4a37',
      full_name: '',
      email: '',
      start_address: '',
      end_address: '',
      time: '',
      total_seats: '',
      avatar: '',
      drivers_license: '',
      driver_reviews: [],
      recent_riders: [],
      rating: 4,
      //hardcoded rating ^ for now
      driver_trips: [],
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
    //console.log('driver props', props)
    //console.log('IDDDD', id)
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      //console.log('got da driver', result)
      this.setState({
        full_name: result.data[0].full_name,
        email: result.data[0].email,
        start_address: result.data[0].driver_route.start_address,
        end_address: result.data[0].driver_route.end_address,
        time: result.data[0].driver_route.time,
        avatar: result.data[0].avatar,
        drivers_license: result.data[0].drivers_license,
        driver_reviews: result.data[0].driver_reviews,
        recent_drivers: result.data[0].recent_drivers
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
      email: this.state.email,
      drivers_license: this.state.drivers_license
    }
    axios.post('/updateDriverProfile', editedInfo)
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
    console.log('CHECKING DRIVER PROPS', this.props)
    return (
      <div>
      {/* TOP BUTTONS */}
        {/* <Link to="/riderprofile" > */}
        <Link
      to="/riderprofile"
      state={{id: this.state.userId}}>
        <span className='profileToggle'>Driver</span>
        <span className='profileToggleButton'><HiOutlineRefresh/></span>
        </Link>
        <Link to="/"><span className='profileLogoutButton'><MdLogout /></span></Link>
        <Link to="/driverview"><span className='profileHomeButton'><AiFillHome/></span></Link>

      {/* PROFILE PHOTO */}
        <div className='profilePhotoDiv'>
          {!this.state.avatar ?
          <img className='profilePhoto' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/> :
          <img className='profilePhoto' src={this.state.avatar} alt="profile avatar"/>
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

            <div className='editProfileSubTitle'>Drivers License #</div>
            <div className='editProfileInputDiv'><input name='drivers_license' onChange={this.handleFormChange} className='editProfileInput' placeholder={this.state.drivers_license}/></div>

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
          {this.state.driver_reviews.length === 0 ?
          <div className='profilePlaceholder'>No reviews yet &#129485;</div>
          :
          <DriverReviewsList driver_reviews={this.state.driver_reviews} />
          }
        </div>

      {/* RECENT RIDERS */}
        <div>
          <span className='profileTitle'>Recent riders</span>
          <div className='profileRecentDriverContainer'>
          {this.state.recent_riders.length === 0 ?
          <div className='profilePlaceholder2'>None yet &#129485;</div>
          :
          <Link to="/ratings_reviews">
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
          {this.state.driver_trips.length === 0 ?
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
            <div className='profileCurrentRouteInfo'>{(this.state.driver_trips.length + 1) * .05} trees &#127794; <div>or</div> {(this.state.driver_trips.length + 1)* 10} minutes of driving &#128663;</div>
            <div className='profileSavingsTitle'>This translates to</div>
            <div className='profileCurrentRouteInfo'>${(this.state.driver_trips.length + 1)* 5.35} you saved on gas &#9981;</div>
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

//export default DriverProfile;
export default () => (
  <DriverProfile params={useParams()} location={useLocation()} />
);