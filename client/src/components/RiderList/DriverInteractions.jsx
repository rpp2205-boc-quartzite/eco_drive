import axios from 'axios';
import mapStyles from "./mapStyles.js";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import RiderList from "./RiderList.jsx";
import { MdLogout } from 'react-icons/md';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { RiRefreshLine, RiLogoutBoxRLine } from "react-icons/ri";

const API_KEY = process.env.GOOGLE_MAP_API_KEY_RIDER_LIST;
// state={{dir: directionsResponse, route: route, userInfo: userInfo}}

const containerStyle = {
  width: '343px',
  height: '275px',
  borderRadius: '10px',
  border: '1px solid var(--gray4)'
};

const center = {
  lat: 34.052235,
  lng: -118.243683
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}


const libraries = ["places"];

const DriverInteractions = function(props) {

  const location = useLocation();


  var mapData = location.state.dir.json;
  var route = location.state.route;
  var userInfo = location.state.userInfo;

  const directions = JSON.parse(mapData)

  useEffect(() => {
    axios.post("/add-driver-route", {
      info: route,
      distance: directions.routes[0].legs[0].distance.text
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [route, directions])

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries
  });

  const[loaded, setLoaded] = React.useState(false);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [riders, setRiders] = React.useState([]);
  const [userRouteInfo, setUserRouteInfo] = React.useState({})
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [seats, setSeating] = React.useState(1)
  const [driverData, setDriver] = React.useState({});


  useEffect(() => {
    const interval = setInterval(() => {

      const findRiders = () => {
        const driver = {
          userId: route.id,
          start_address: route.start_address,
          start_lat: route.start_lat,
          start_lng: route.start_lng,
          end_address: route.end_address,
          end_lat: route.end_lat,
          end_lng: route.end_lng,
          time: route.time,
          total_seats: route.total_seats,
          default: route.default,
        }


        setDriver(driver);

        setUserRouteInfo(driver);
        return axios.post('/rider-list', driver)
          .then((res) => {
            setSeating(res.data.seats);
            return setRiders(res.data.riders);
          })
          .catch((err) => console.log('Find drivers error: ', err))
      }
      findRiders();
    }, 500);
    return () => clearInterval(interval);
  }, [route]);

  if (route) {
    var savedRoute = route;
    if (typeof route !== 'string') {
      savedRoute = JSON.stringify(route);
    }
    localStorage.setItem("currentRoute", savedRoute);
  }

  if (userInfo) {
    var savedUserInfo = userInfo;
    if (typeof route !== 'string') {
      savedUserInfo = JSON.stringify(userInfo);
    }
    localStorage.setItem("currentUserInfo", savedUserInfo);
  }

  useEffect(() => {
    if (!loaded)
        setDirectionsResponse(directions);
        setDistance(directions.routes[0].legs[0].distance.text);
        setDuration(directions.routes[0].legs[0].duration.text);
        setLoaded(true)
  }, [loaded, directions]);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])


  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return (
    <div className='loading-screen'>
      <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
      <p>Finding Riders...</p>
   </div>
  )

  const mapCheck = function() {
    if (!Object.keys(directionsResponse).length) {
      return (
          <div className='loading-screen'>
            <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
            <p>Loading Map...</p>
        </div>
        )

    } else {
      return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={11}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse}/>
          )}
      </GoogleMap>)
    }
  }


  // className="allDefaultView"

  return (
    <div className='rider-list-container'>
    {/* <div className="defaultViewHeader">
      <div className="headerToggleView">
          <div className="viewToggle">Driver</div>
          <Link to="/riderview">
            <RiRefreshLine className='top-bar-icons' />
          </Link>
      </div>
      <div className="headerAvatarLogout">
          <div className="headerAvatar">
            <Link to="/driverprofile" state={{id: userInfo._id, from: 'driverview'}}>
              <img
                  src={userInfo.avatar}
                  alt="avatar-small"
                  className="profilePhoto"
                />
            </Link></div>

          <div className="headerLogout">
            <Link to="/">
            <MdLogout className="logout" size={20}/>
            </Link></div>
        </div>
      </div> */}
      <div className='top-bar'>
              <div className='top-bar-left'>
                <p>Driver</p>
                <Link to="/riderview">
                  <RiRefreshLine className='top-bar-icons' />
                </Link>
              </div>
              <div className='top-bar-right'>
                <Link to="/driverprofile" state={{id: userInfo._id, from: 'driverview', distance: distance}}>
                  <img className='avatar' src={userInfo.avatar} alt="" />
                </Link>
                <RiLogoutBoxRLine className='top-bar-icons' onClick={props.logOut}/>
              </div>
            </div>
      <br></br>
        <div className='title-bar'>
          <Link to="/driverview" state={{distance: distance}}>
              <BiArrowBack className='driver-list-back-icon' />
          </Link>
            <p>Your Route</p>
        </div>
        <div className='map-container'>
          <div className="Gmap">
            {mapCheck()}
          </div>
        </div>

      <br></br>
      <div className="driver-list">
          <p>Total Distance: {distance}</p>
          <p>Expected Duration: {duration}</p>
      </div>
        <br></br>
        <div className="driver-list" data="DriverInteractions">
          <RiderList driver={route} distance={distance} riders={riders} seats={seats} userInfo={userInfo} mapData={location.state.dir} />
        </div>
    </div>
  )
}

export default DriverInteractions;
