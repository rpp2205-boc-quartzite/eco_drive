import "./RiderList.css";
import mapStyles from "./mapStyles.js"
import ApiKey from "../DefaultView/apiKey.js";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import RiderList from "./RiderList.jsx"
import { GoogleMap, useJsApiLoader, useLoadScript, LoadScript, Marker, InfoWindow, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";

const api = ApiKey;

const containerStyle = {
  width: '370px',
  height: '275px'
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

  const data = location.state.json

  const directions = JSON.parse(data)


  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: api,
    libraries
  });

  const[loaded, setLoaded] = React.useState(false);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [ridersArray, setRidersArray] = React.useState([
    {
      name: "Suzy Thompson",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .25,
      to: .10,
      time: "9:00am",
    },
    {
      name: "Mark Manchin",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .62,
      to: .05,
      time: "9:00am",
    },
    {
      name: "Trouble Maker",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .02,
      to: .02,
      time: "9:00am",
    }
  ]);

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
      <p>Finding drivers...</p>
   </div>
  )

  const mapCheck = function() {
    if (!Object.keys(directionsResponse).length) {
      return (
          <div className='loading-screen'>
            <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
            <p>Finding drivers...</p>
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


  return (
    <div>
      {/* {console.log("KEY ", process.env.REACT_APP_APIKEY, "and Key ", ApiKey )} */}
      <div>
        <div className="top-area">
          <div className="setting">Driver</div>

          <div className="profile-pic-padd">
            <img className="profile-picture" alt="lady from FEC" src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
          </div>
          <Link to="/driverview" >
            <button className="return-main" type="submit">return</button>
          </Link>
        </div>
      </div>
      <br></br>
      <div className="Gmap">
        {mapCheck()}
      </div>
      <br></br>
      <div className="MapData">
        <div className="route">
          <h3>Total Distance: {distance}</h3>
          <h3>Expected Duration: {duration}</h3>
        </div>
      </div>
        <br></br>
        <div className="rider-list" data="DriverInteractions">
          <Link to="/driverview" >
            <button className="return-main" type="submit">return</button>
          </Link>
          <br></br>
          <RiderList riders={ridersArray}/>
        </div>
        <br></br>
        <div>
          <button className="start-trip" type="submit">Start Trip</button>
        </div>
    </div>
  )
}

export default DriverInteractions;