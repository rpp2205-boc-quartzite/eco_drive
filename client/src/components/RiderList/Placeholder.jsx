import React, {useState, Suspense} from 'react';
import DriverInteractions from './DriverInteractions.jsx';
import { Circles } from 'react-loader-spinner';
import "./RiderList.css";
import { useLocation } from "react-router-dom";
import { GoogleMap, useJsApiLoader, useLoadScript, LoadScript, Marker, InfoWindow, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';


const API_KEY = process.env.GOOGLE_MAP_API_KEY_RIDER_LIST;

const libraries = ["places"];


export default function Placeholder(props) {

  const location = useLocation();

  const data = location;

  console.log('This is what I\'m getting: ', data)



  const [ridersArray, setRidersArray] = useState([
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


  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries
  });

  const [directionsResponse, setDirectionsResponse] = React.useState({});


  const pickUpRef = React.useRef();
  const dropOffRef = React.useRef();



  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return <Circles />

  async function calculateRoute() {
    if (pickUpRef.current.value === '' || dropOffRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickUpRef.current.value,
      destination: dropOffRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionsResponse(results);
    console.log('Results', results);
    console.log('TEST LENGTH', Object.keys(directionsResponse).length)
  }


  if (!Object.keys(directionsResponse).length) {
    return (
          <div className="App">
             {console.log(Object.keys(directionsResponse).length)};
            <div className="route">
              <h3>Input Your Route</h3>
              <Autocomplete>
                <input type="text" name="pickUp" placeholder="Pick-Up Location" ref={pickUpRef}/>
              </Autocomplete>
              <Autocomplete>
                <input type="text" name="dropOff" placeholder="Drop-Off Location" ref={dropOffRef}/>
              </Autocomplete>
              <button type="submit" onClick={calculateRoute}>Create Route</button>
            </div>
          </div>
          )
  } else {
    return (
      <DriverInteractions directions={directionsResponse} riders={ridersArray}/>
    )
  }

}