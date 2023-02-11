import React from 'react';
import axios from 'axios';
import { RiRefreshLine, RiLogoutBoxRLine, RiHome4Fill, RiPencilFill, RiCheckboxCircleFill } from "react-icons/ri";
import RiderReviewsList from './RiderReviewsList.jsx';
import RiderRecentList from './RiderRecentList.jsx';
import PreviousRidesList from './PreviousRidesList.jsx';
import Ratings from 'react-ratings-declarative';
import { useLocation, useParams, Link } from "react-router-dom";
import { randomFacts } from './RandomFacts.jsx';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class RiderProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log( 'RIDER PROFILE PROPS', this.props)
    this.state = {
      userId: this.props.location.state.id,
      //userId: '63d36e8fcd478f26557c4a37',
      // userId: '63db055e255ff6bddca10fe6',
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
      rating: 0,
      rider_trips: [],
      editProfile: false,
      infoChangedSuccess: false,
      wholeObj: {}
    };
    this.editProfileOrClose = this.editProfileOrClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessClosure = this.handleSuccessClosure.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount () {
    var id = this.state.userId;
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      console.log('got da rider', result.data[0])
      if (result.data[0].rider_reviews.length > 0) {
        var ratings = result.data[0].rider_reviews.map(ratings => ratings.rating)
        var count = 0
        for (var i = 0; i < ratings.length; i++) {
          count += ratings[i]
        }
        var average = count / ratings.length
      } else {
        var average = 0;
      }

      console.log('AVGGGG VG', average)
      this.setState({
        full_name: result.data[0].full_name,
        email: result.data[0].email,
        start_address: result.data[0].rider_route.start_address,
        end_address: result.data[0].rider_route.end_address,
        time: result.data[0].rider_route.time,
        avatar: result.data[0].avatar,
        drivers_license: result.data[0].drivers_license,
        rider_reviews: result.data[0].rider_reviews,
        recent_drivers: result.data[0].recent_drivers,
        wholeObj: result,
        rider_trips: result.data[0].rider_trips,
        rating: average
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

  logOut() {
    cookies.remove('TOKEN', {
      path: "/",
    });
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
    //console.log('CHECKING RIDER PROPS', this.props.location.state.id)
    //console.log('HELLOOOO', this.state.recent_drivers)
    return (
      <div>
      {/* TOP BUTTONS */}
        {/* {this.state.drivers_license ?
        // <Link to="/driverprofile">

      <Link
      to="/driverprofile"
      state={{id: this.state.userId}}>
        <span className='profileToggle'>Rider</span>
        <span className='profileToggleButton'><RiRefreshLine/></span>
        </Link> : <span>
        <span className='profileToggle'>Rider</span>
        <span className='profileToggleButton'><RiRefreshLine/></span></span>
        }

        <Link to="/"><span className='profileLogoutButton'><RiLogoutBoxRLine /></span></Link>
        <Link to="/riderview"><span className='profileHomeButton'><RiHome4Fill/></span></Link> */}

        <div className='top-bar'>
        <div className='top-bar-left'>
          <p>Rider</p>
          {this.state.drivers_license
            ? <Link to="/driverprofile" state={{id: this.state.userId}}>
                <RiRefreshLine className='top-bar-icons' />
              </Link>
            : <RiRefreshLine className='top-bar-icons' />
          }
        </div>
        <div className='top-bar-right'>
          <Link to="/riderview">
            <RiHome4Fill className='top-bar-icons'/>
          </Link>
          <Link to="/">
            <RiLogoutBoxRLine className='top-bar-icons' onClick={this.logOut}/>
          </Link>
        </div>
      </div>

      {/* <div className="welcomeCont">
        <div className="welcomeMsg">Welcome {name.split(' ')[0]},</div>
      </div> */}

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
            Update Profile <RiPencilFill
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
        <div className='profileCheck'><RiCheckboxCircleFill size="40px"/></div>
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
          <div className='profilePlaceholder2'>None yet &#129485;
        </div>
          :
        <div>
          <RiderRecentList recent_drivers={this.state.recent_drivers} wholeObj={this.state.wholeObj}/>
        </div>
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
          <PreviousRidesList rider_trips={this.state.rider_trips}/>
          }

        </div>

      {/* SAVINGS THIS MONTH */}
      <div>
          <span className='profileTitle'>Your savings this month</span>
          <div className='profileSavings'>
            <div className='profileSavingsTitle'>You saved the equivalent of</div>
            <div className='profileCurrentRouteInfo'>{ (Math.round(((this.state.rider_trips.length + 1) * .05) * 100) / 100).toFixed(2) } trees &#127794; <div>or</div> {(Math.round(((this.state.rider_trips.length + 1) * 10) * 100) / 100).toFixed(0)} minutes of driving &#128663;</div>
            <div className='profileSavingsTitle'>This translates to</div>
            <div className='profileCurrentRouteInfo'>${ (Math.round(((this.state.rider_trips.length + 1) * 5.35) * 100) / 100).toFixed(2) } you saved on gas &#9981;</div>
          </div>
          <span className='profileTitle'>Did you know? &#128173;</span>
          <div className='profileCurrentRoute'>
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