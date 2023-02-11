import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiRefreshLine, RiLogoutBoxRLine, RiSearchLine } from "react-icons/ri";
import { format } from "date-fns";
import Autocomplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

import DefaultRouteRider from './DefaultRouteRider.jsx';
import OngoingTripRider from './OngoingTripRider.jsx';
import UpcomingTripRider from './UpcomingTripRider.jsx';
import './ongoing-trip-style.css';


function RiderView ({ userId, riderOnGoingRoute, logOut }) {

  const location = useLocation();

  var distance;
  if (location.state) {
    distance = location.state.distance
  } else {
    distance = 0;
  }


  const [startedTrip, setStartedTrip] = useState(riderOnGoingRoute.started ? riderOnGoingRoute.started : false);

  console.log('Started trip: ', startedTrip)


  const startTrip = async () => {
    let result = await axios.put(`/start-route/${userId}/rider`).catch(err => console.log('ERROR:', err))
    setStartedTrip(true);
  }

  const endTrip = async () => {
    let result = await axios.put(`/end-trip/${userId}/rider`).catch(err => console.log('ERROR:', err))
    setStartedTrip(false);
  }

  const [start, setStart] = useState({
    start_address: '',
    start_lat: '',
    start_lng: ''
  })
  const [end, setEnd] = useState({
    end_address: '',
    end_lat: '',
    end_lng: ''
  })
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('https://i.pinimg.com/474x/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg');
  const [userInfo, setUserInfo] = useState({});
  const [displayTime, setDisplayTime] = useState(new Date());
  const [time, setTime] = useState(format(displayTime, 'hh:mm aa'));
  const [isDefault, setIsDefault] = useState(false);
  const [upcoming, setUpcoming] = useState({});
  const [favorites, setFavorites] = useState({});
  const [defaultRoute, setDefaultRoute] = useState({});
  const [timeClicked, setTimeClicked] = useState(false);
  const [upcomingCheck, setUpcomingCheck] = useState(false)

  const API_KEY = process.env.GOOGLE_MAP_API_KEY_VIEWS;
  const navigate = useNavigate()

  const handleUpcomingChange = (bool) => {
    setUpcomingCheck(bool)
  }

  const route = {
    _id: userId,
    full_name: name,
    start_address: start.start_address,
    start_lat: start.start_lat,
    start_lng: start.start_lng,
    end_address: end.end_address,
    end_lat: end.end_lat,
    end_lng: end.end_lng,
    time: time,
    default: isDefault,
    userFavorites: favorites
  }

  useEffect(() => {
    axios.get('/getriderview', { params: {userId} })
    .then((result) => {
      setAvatar(result.data[0].avatar)
      setName(result.data[0].full_name)
      setUserInfo(result.data[0])
      setFavorites(result.data[0].favorites)
      setDefaultRoute(result.data[0].default_rider_route)
      if (result.data[0].rider_route.driver_id !== undefined) {
        setStartedTrip(result.data[0].rider_route.started)
      }
      if (result.data[0].rider_route.start_address && result.data[0].rider_route.end_address !== undefined) {
        setUpcoming(result.data[0].rider_route)
        handleUpcomingChange(true)
      }
      if (startedTrip) {
        handleUpcomingChange(false)
      }
    })
    .catch(err => console.log(err))
  }, [userId, startedTrip])

  const handleClick = (e) => {
    e.preventDefault();
    if (!start.start_address) {
      alert('Please enter a starting point')
    } else if (!end.end_address) {
      alert('Please enter a destination')
    } else if (isDefault) {
      axios.post('/rider/:_id/defaultroute', {data: route})
      .then((result) => {
        navigate('/driver-list', {state: {route: route, userInfo: userInfo, from: 'riderview'}})
      })
      .catch(err => console.log(err))
    } else {
      navigate('/driver-list', {state: {route: route, userInfo: userInfo, from: 'riderview'}})
    }
  }

  const disabled = Boolean(
    startedTrip || upcomingCheck
  ) ? true : false;

  return (
    <div className="allDefaultView">
      <div className='top-bar'>
        <div className='top-bar-left'>
          <p>Rider</p>
          <Link to="/driverview">
            <RiRefreshLine className='top-bar-icons' />
          </Link>
        </div>
        <div className='top-bar-right'>
          <Link to="/riderprofile" state={{id: userId, userInfo: userInfo, from: 'riderview'}}>
            <img className='avatar' src={avatar} alt="avatar-small" />
          </Link>
          <Link to="/">
            <RiLogoutBoxRLine className='top-bar-icons' onClick={logOut}/>
          </Link>
        </div>
      </div>

      <div className="welcomeCont">
        <div className="welcomeMsg">Welcome <span className='highlight-name'>{name.split(' ')[0]}</span>,</div>
      </div>

      <div className="findNearestDrivers">Find your nearest drivers</div>
        <form>
          <div className="inputFieldsCont">
            <div className="inputFields">
              <Autocomplete
                  className="inputField1"
                  apiKey={API_KEY}
                  placeholder="Starting point"
                  onPlaceSelected={(place) => {
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();
                    setStart({...start, start_address: place.formatted_address, start_lat: lat, start_lng: lng})
                    console.log(place);
                  }}
                  options={{
                    types: ["address"],
                    componentRestrictions: { country: "us" },
                  }}
                />
                <Autocomplete
                    className="inputField2"
                    apiKey={API_KEY}
                    placeholder="Destination"
                    onPlaceSelected={(place) => {
                      let lat = place.geometry.location.lat();
                      let lng = place.geometry.location.lng();
                      setEnd({...end, end_address: place.formatted_address, end_lat: lat, end_lng: lng})
                      console.log(place);
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                  <DatePicker
                      className="inputField3"
                      placeholderText="Start time"
                      selected={timeClicked ? displayTime : null}
                      onChange={(date) => {
                        setTime(format(date, 'hh:mm aa'));
                        setDisplayTime(new Date(date));
                        setTimeClicked(true);
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
              <div className="defaultRadioCont">
                <input type="checkbox" className="radioInput" checked={isDefault} onChange={(e) => setIsDefault(!isDefault)}/> <div className="saveDefaultText">Set as default route</div>
              </div>
            </div>

            <button
                onClick={(e) => handleClick(e)}
                disabled={disabled}
                className="primary-btn-find"> {disabled ? `You have an ${startedTrip ? 'ongoing' : 'upcoming'} route` : 'Find Drivers'}
                {!disabled ? <RiSearchLine className="searchBtn" size={20}/> : ''}
            </button>

          </div>
        </form>
      <div className='default-ongoing-upcoming-flex'>
        {defaultRoute.default
        ? <DefaultRouteRider userId={userId} defaultRoute={defaultRoute} favorites={favorites} userInfo={userInfo} from={'riderview'} startedTrip={startedTrip} upcomingCheck={upcomingCheck}/>
        : (
            <div className="ongoing-trip-container">
              <h5>Default Route</h5>
              <div className="driver-card">
                <p className='not-found-text'>No default route set</p>
              </div>
            </div>
        )
        }
        {startedTrip === true
        ? <OngoingTripRider userId={userId} riderOnGoingRoute={riderOnGoingRoute} endTrip={endTrip} distance={distance}/>
        : (
            <div className="ongoing-trip-container">
              <h5>Ongoing Trip</h5>
              <div className="driver-card">
                <p className='not-found-text'> No active routes </p>
              </div>
            </div>
          )
        }
        {!startedTrip
        ? <UpcomingTripRider userId={userId} startTrip={startTrip} onChange={handleUpcomingChange}/>
        : (
            <div className="ongoing-trip-container">
              <h5>Upcoming Trip</h5>
              <div className="driver-card">
                <p className='not-found-text'>No upcoming routes</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RiderView;