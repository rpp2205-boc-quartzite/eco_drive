import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TbRefresh } from "react-icons/tb";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";

import DefaultRoute from './DefaultRoute.jsx';
import DriverPrompt from './DriverPromptModal.jsx';
import OngoingTripDriver from './OngoingTripDriver.jsx';
import UpcomingTripDriver from './UpcomingTripDriver.jsx';
import './ongoing-trip-style.css';

function DriverView ({ userId }) {

  const [startedTrip, setStartedTrip] = useState(false);

  const startTrip = async () => {
    let result = await axios.put(`/start-route/${userId}/driver`).catch(err => console.log('ERROR:', err))
    setStartedTrip(true);
  }

  const endTrip = async () => {
    let result = await axios.put(`/end-trip/${userId}/driver`).catch(err => console.log('ERROR:', err))
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
  const [avatar, setAvatar] = useState('');
  const [displayTime, setDisplayTime] = useState(new Date());
  const [time, setTime] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [upcoming, setUpcoming] = useState({});
  const [showPrompt, setPrompt] = useState(false);
  const [favorites, setFavorites] = useState({});
  const API_KEY = process.env.GOOGLE_MAP_API_KEY_VIEWS;

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
        // console.log('FINISHED');
        setLoading(false);
      }

      CalculateRoute()
    }
  }, [loading])

  useEffect(() => {
    if (typeof directionsResponse !== 'string') {
      console.log(directionsResponse)
    }
  }, [directionsResponse])



    //*****************************************************//
    //ABOVE IS CODE THAT RENDERS DATA NEEDED FOR RIDER-LIST MAP/////////////////////////////////////////////////////////////
    //*****************************************************//

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
      setUpcoming(result.data[0].driver_route)
      setFavorites(result.data[0].favorites)
      if (result.data[0].driver_route.start_address !== undefined) {
        setStartedTrip(result.data[0].driver_route.started)
      }
      if (!result.data[0].drivers_license) {
        setPrompt(true)
      }
    })
    .catch(err => console.log(err))
  }, [])

  const closeModal = () => {
    setPrompt(!showPrompt)
  }

  return (
    <div className="allDefaultView">
      <div className="defaultViewHeader">
        <div className="headerToggleView">
          <Link to="/riderview">
            <div className="viewToggle">Driver</div>
            <TbRefresh className="viewToggleButton" size={25} />
          </Link>
        </div>
        <div className="headerAvatarLogout">
          <div className="headerAvatar">
            <Link to="/driverprofile" state={{id: userId}}>
            <button>Avatar</button>
            </Link></div>

          <div className="headerLogout">
            <Link to="/">
            <MdLogout className="logout" size={20}/>
            </Link></div>
        </div>
      </div>

      <div className="welcomeCont">
        <div className="welcomeMsg">Welcome {name},</div>
      </div>

      {showPrompt ? <DriverPrompt show={showPrompt} close={closeModal} userId={userId}/> : ''}

      <div className="findNearestDrivers">Find your nearest riders</div>
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
              <input type="text" className="inputField4" placeholder="Available seats" onChange={(e) => setSeats(Number(e.target.value))}/>
              <div className="defaultRadioCont">
                <input type="radio" className="radioInput" onChange={(e) => setIsDefault(true)}/> <div className="saveDefaultText">Set as default route</div>
              </div>
            </div>
            <Link to="/rider-list" state={{dir: directionsResponse, route: route}}>
            <button disabled={!start.start_address || !end.end_address} className="primary-btn-find">Find Riders</button>
            </Link>
          </div>
        </form>
      <div>
        <DefaultRoute userId={userId} upcoming={upcoming} view={'driver'} favorites={favorites}/>
        {startedTrip === true
        ? <OngoingTripDriver userId={userId} endTrip={endTrip}/>
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
        ? <UpcomingTripDriver userId={userId} startTrip={startTrip}/>
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

export default DriverView;