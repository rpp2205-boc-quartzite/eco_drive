import "./RiderList.css";
import mapStyles from "./mapStyles.js"
import ApiKey from "./apiKey.js";
import React, { useEffect } from "react";
import RiderList from "./RiderList.jsx"
import { GoogleMap, useJsApiLoader, useLoadScript, LoadScript, Marker, InfoWindow, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Circles } from 'react-loader-spinner';

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

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: api,
    libraries
  });

  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');

  useEffect(() => {
        setDirectionsResponse(props.directions);
        setDistance(props.directions.routes[0].legs[0].distance.text);
        setDuration(props.directions.routes[0].legs[0].duration.text);
        console.log(props.directions);
  }, [props]);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])


  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return <Circles />

  const mapCheck = function() {
    if (!directionsResponse) {
      return <Circles />
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
          <button className="toggle-rider" type="submit">circle</button>
          <img className="profile-picture" alt="lady from FEC" src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
          <button className="return-main" type="submit">return</button>
        </div>
      </div>
      <br></br>
      <div className="Gmap">
        {mapCheck()}
      </div>
      <br></br>
      <div className="MapData">
        <div className="route">
          <h5>Total Distance:</h5>
          <h5>{distance}</h5>
          <h5>Expected Duration:</h5>
          <h5>{duration}</h5>
        </div>
      </div>
        <br></br>
        <div className="rider-list" data="DriverInteractions">
          <button className="back-button" type="submit">back arrow</button>
          <br></br>
          <RiderList riders={props.riders}/>
        </div>
        <br></br>
        <div>
          <button className="start-trip" type="submit">Start Trip</button>
        </div>
    </div>
  )
}

export default DriverInteractions;