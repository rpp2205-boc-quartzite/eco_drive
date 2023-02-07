import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
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


function RiderView ({ userId, riderOnGoingRoute }) {

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
  const [avatar, setAvatar] = useState('');
  const [userInfo, setUserInfo] = useState({})
  const [displayTime, setDisplayTime] = useState(new Date());
  const [time, setTime] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [upcoming, setUpcoming] = useState({});
  const [favorites, setFavorites] = useState({});
  const [defaultRoute, setDefaultRoute] = useState({});
  const API_KEY = process.env.GOOGLE_MAP_API_KEY_VIEWS;
  const navigate = useNavigate()

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
      setUpcoming(result.data[0].rider_route)
      setFavorites(result.data[0].favorites)
      setUserInfo(result.data[0])
      setDefaultRoute(result.data[0].default_rider_route)
      if (result.data[0].rider_route.driver_id !== undefined) {
        setStartedTrip(result.data[0].rider_route.started)
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    axios.post('/rider/:_id/defaultroute', {data: route})
    .then((result) => {
      navigate('/driver-list', {state: {route: route, userInfo: userInfo}})
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="allDefaultView">
      <div className="defaultViewHeader">
        <div className="headerToggleView">
          <Link to="/driverview">
            <div className="viewToggle">Rider</div>
            <HiOutlineRefresh className="viewToggleButton" size={25}/>
          </Link>
        </div>

        <div className="headerAvatarLogout">
          <div className="headerAvatar">
            <Link to="/riderprofile" state={{id: userId}} >
              <img
                src={avatar}
                alt="avatar-small"
                className="defaultViewAvatar"
              />
            </Link> </div>

          <div className="headerLogout">
            <Link to="/">
            <MdLogout className="logout" size={20}/>
            </Link></div>
        </div>
      </div>

      <div className="welcomeCont">
        <div className="welcomeMsg">Welcome {name},</div>
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
                      selected={displayTime}
                      onChange={(date) => {
                        setTime(format(date, 'hh:mm aa'));
                        setDisplayTime(new Date(date));
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
              <div className="defaultRadioCont">
                <input type="radio" className="radioInput" onClick={(e) => setIsDefault(true)}/> <div className="saveDefaultText">Set as default route</div>
              </div>
            </div>
            {isDefault
            ? <button
                onClick={(e) => handleClick(e)}
                disabled={!start.start_address || !end.end_address} className="primary-btn-find">Find Drivers
              </button>
            : <Link to="/driver-list" state={{route: route, userInfo: userInfo}}>
                <button
                  disabled={!start.start_address || !end.end_address} className="primary-btn-find">Find Drivers
                </button>
              </Link>
            }
          </div>
        </form>
      <div>
        {defaultRoute.default
        ? <DefaultRouteRider userId={userId} defaultRoute={defaultRoute} view={'rider'} favorites={favorites} userInfo={userInfo}/>
        : (
          <div>
            <div className="defaultRouteTitle">Default Route</div>
            <div className="card">
              <p> No Default Route Set </p>
            </div>
          </div>
        )
        }
        {startedTrip === true
        ? <OngoingTripRider userId={userId} endTrip={endTrip}/>
        : (
          <div className="ongoing-trip-container">
            <div className="ongoing-title">Ongoing Trip</div>
            <div className="card">
              <p> No Active Routes </p>
            </div>
          </div>
        )
        }
        {!startedTrip
        ? <UpcomingTripRider userId={userId} startTrip={startTrip}/>
        : (
            <div className="ongoing-trip-container">
              <div className="ongoing-title">Upcoming Trip</div>
              <div className="card">
                <p> No Upcoming Routes </p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RiderView;