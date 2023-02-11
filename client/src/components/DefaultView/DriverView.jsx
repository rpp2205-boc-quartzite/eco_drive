import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiRefreshLine, RiLogoutBoxRLine, RiAddFill } from "react-icons/ri";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from 'react-router-dom';
import DefaultRouteDriver from './DefaultRouteDriver.jsx';
import DriverPrompt from './DriverPromptModal.jsx';
import OngoingTripDriver from './OngoingTripDriver.jsx';
import UpcomingTripDriver from './UpcomingTripDriver.jsx';
import './ongoing-trip-style.css';

function DriverView ({ userId, logOut }) {

  const location = useLocation();

  var distance;
  if (location.state) {
    distance = location.state.distance
  } else {
    distance = 0;
  }

  const [startedTrip, setStartedTrip] = useState(false);

  const startTrip = async () => {
    await axios.put(`/start-route/${userId}/driver`).catch(err => console.log('ERROR:', err))
    setStartedTrip(true);
  }

  const endTrip = async () => {
    await axios.put(`/end-trip/${userId}/driver`).catch(err => console.log('ERROR:', err))
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
  const [seats, setSeats] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('https://i.pinimg.com/474x/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg');
  const [userInfo, setUserInfo] = useState({});
  const [displayTime, setDisplayTime] = useState(new Date());
  const [time, setTime] = useState(format(displayTime, 'hh:mm aa'));
  const [isDefault, setIsDefault] = useState(false);
  const [upcoming, setUpcoming] = useState({});
  const [showPrompt, setPrompt] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [defaultRoute, setDefaultRoute] = useState({});
  const [timeClicked, setTimeClicked] = useState(false);
  const [upcomingCheck, setUpcomingCheck] = useState(false)

  const API_KEY = process.env.GOOGLE_MAP_API_KEY_VIEWS;
  const navigate = useNavigate()

  const handleUpcomingChange = (bool) => {
    setUpcomingCheck(bool)
  }

  //*****************************************************//
  //BELOW IS CODE THAT RENDERS DATA NEEDED FOR RIDER-LIST MAP/////////////////////////////////////////////////////////////
  //*****************************************************//
  const [directionsResponse, setDirectionsResponse] = useState('not updated');
  const [pickUp, setPickUp] = useState(null);
  const [dropOff, setDropOff] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickUpRef = React.useRef();
  const dropOffRef = React.useRef();

  useEffect(() => {
    if (pickUp && dropOff) {
      setLoading(true);
      console.log('Loaded!')
    }
  }, [pickUp, dropOff])


  useEffect(() => {
    if (loading) {
      async function CalculateRoute() {

        if (pickUpRef.current.value === '' || dropOffRef.current.value === '') {
          return
        };

        const directionsService = new google.maps.DirectionsService();

        const results = await directionsService.route({
          origin: pickUpRef.current.value,
          destination: dropOffRef.current.value,
          travelMode: google.maps.TravelMode.DRIVING
        });

        setDirectionsResponse({json: JSON.stringify(results)});
        console.log('FINISHED');
        setLoading(false);
      }

      CalculateRoute()
    }
  }, [loading])

  useEffect(() => {
    if (typeof directionsResponse !== 'string') {
      console.log('All Good!')
    }
  }, [directionsResponse])

  if (typeof directionsResponse !== 'string') {
    var jsonCurrentMapData = JSON.stringify(directionsResponse);
    localStorage.setItem("currentMapData", jsonCurrentMapData);
  }

  if (typeof window !== 'undefined') {
    if (isDefault) {
      var jsonMapData = JSON.stringify(directionsResponse);
      localStorage.setItem("defaultRouteMap", jsonMapData);
      // console.log('Default Route Set', jsonMapData);
    }
  }

  const pulledRoute = localStorage.getItem("currentRoute");
  const passedRoute = JSON.parse(pulledRoute);

  const pulledMapData = localStorage.getItem("currentMapData");
  const passedMapData = JSON.parse(pulledMapData);

  const pulledUserInfo = localStorage.getItem("currentUserInfo");
  const passedUserInfo = JSON.parse(pulledUserInfo);

    //*****************************************************//
    //ABOVE IS CODE THAT RENDERS DATA NEEDED FOR RIDER-LIST MAP/////////////////////////////////////////////////////////////
    //*****************************************************//


    // console.log('DIRRRRR', directionsResponse)

  const route = {
    id: userId,
    full_name: name,
    start_address: start.start_address,
    start_lat: start.start_lat,
    start_lng: start.start_lng,
    end_address: end.end_address,
    end_lat: end.end_lat,
    end_lng: end.end_lng,
    time: time,
    default: isDefault,
    total_seats: seats
  }

  useEffect(() => {
    axios.get('/getdriverview', { params: {userId} })
    .then((result) => {
      setAvatar(result.data[0].avatar)
      setName(result.data[0].full_name)
      setUserInfo(result.data[0])
      setFavorites(result.data[0].favorites)
      setDefaultRoute(result.data[0].default_driver_route)
      if (result.data[0].driver_route.start_address !== undefined) {
        setStartedTrip(result.data[0].driver_route.started)
      }
      if (!result.data[0].drivers_license) {
        setPrompt(true)
      }
      if (result.data[0].driver_route.start_address !== undefined) {
        setUpcoming(result.data[0].driver_route)
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
      axios.post('/driver/:_id/defaultroute', {data: route})
    .then((result) => {
      navigate('/rider-list', {state: {dir: directionsResponse, route: route, userInfo: userInfo}})
    })
    .catch(err => console.log(err))
    } else {
      navigate('/rider-list', {state: {dir: directionsResponse, route: route, userInfo: userInfo}})
    }
  }

  const disabled = Boolean(
    startedTrip || upcomingCheck
  ) ? true : false;

  const closeModal = () => {
    setPrompt(!showPrompt)
  }

  return (
    <div className="allDefaultView">
      <div className='top-bar'>
        <div className='top-bar-left'>
          <p>Driver</p>
          <Link to="/riderview" state={ {distance} }>
            <RiRefreshLine className='top-bar-icons' />
          </Link>
        </div>
        <div className='top-bar-right'>
          <Link to="/driverprofile" state={{id: userId, userInfo: userInfo, from: 'driverview'}}>
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

      {showPrompt ? <DriverPrompt show={showPrompt} close={closeModal} userId={userId}/> : ''}

      <div className="findNearestDrivers">Start your new trip</div>
        <form>
          <div className="inputFieldsCont">
            <div className="inputFields">
              <Autocomplete
                className="inputField1"
                apiKey={API_KEY}
                placeholder="Starting point"
                ref={pickUpRef}
                onPlaceSelected={(place) => {
                  let lat = place.geometry.location.lat();
                  let lng = place.geometry.location.lng();
                  setStart({...start, start_address: place.formatted_address, start_lat: lat, start_lng: lng});
                  setPickUp(place.formatted_address);
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
                ref={dropOffRef}
                onPlaceSelected={(place) => {
                  let lat = place.geometry.location.lat();
                  let lng = place.geometry.location.lng();
                  setEnd({...end, end_address: place.formatted_address, end_lat: lat, end_lng: lng});
                  setDropOff(place.formatted_address);
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
              <input type="text" className="inputField4" placeholder="Available seats" onChange={(e) => setSeats(Number(e.target.value))}/>
              <div className="defaultRadioCont">
                <input type="checkbox" className="radioInput" checked={isDefault} onChange={(e) => setIsDefault(!isDefault)}/> <div className="saveDefaultText">Set as default route</div>
              </div>
            </div>

              <button
                onClick={(e) => handleClick(e)}
                disabled={disabled}
                className="primary-btn-find"> {disabled ? `You have an ${startedTrip ? 'ongoing' : 'upcoming'} route` : 'Create route'}
                {!disabled ? <RiAddFill className="searchBtn" size={20}/> : ''}
              </button>

          </div>
        </form>
      <div className='default-ongoing-upcoming-flex'>
        {defaultRoute.default
        ? <DefaultRouteDriver userId={userId} defaultRoute={defaultRoute} favorites={favorites} dir={directionsResponse} userInfo={userInfo} from={'driverview'} startedTrip={startedTrip} upcomingCheck={upcomingCheck}/>
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
        ? <OngoingTripDriver userId={userId} endTrip={endTrip} passedRoute={passedRoute} passedMapData={passedMapData} passedUserInfo={passedUserInfo} distance={distance}/>
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
        ? <UpcomingTripDriver userId={userId} startTrip={startTrip} passedRoute={passedRoute} passedMapData={passedMapData} passedUserInfo={passedUserInfo} onChange={handleUpcomingChange}/>
        : (
            <div className="ongoing-trip-container">
              <div className="ongoing-title">Upcoming Trip</div>
              <div className="driver-card">
                <p className='not-found-text'> No upcoming routes </p>
              </div>
            </div>
          )
        }
      </div>
      {/* <div>
      <Link to="/rider-list" state={{dir: passedMapData, route: passedRoute, userInfo: passedUserInfo}}>
        <button>
          Place Arrow Here
        </button>
      </Link>
      </div> */}

    </div>
  )
}

export default DriverView;