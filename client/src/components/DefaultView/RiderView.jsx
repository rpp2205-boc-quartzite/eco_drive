import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/Md';
import { useNavigate } from "react-router-dom";
import DefaultRoute from './DefaultRoute.jsx';

function RiderView ({ userId }) {
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
  const [time, setTime] = useState('');
  const [def, setDef] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [default_route, setDefaultRoute] = useState({});
  const navigate = useNavigate();

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
    default: def
  }

  useEffect(() => {
    axios.get('/getriderview', { params: {userId} })
    .then((result) => {
      setAvatar(result.data[0].avatar)
      setName(result.data[0].full_name)
      if (result.data[0].rider_route.default) {
        setDefaultRoute(result.data[0].rider_route)
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => { // Need selected driver to write to db
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
      default: def
    }
    console.log(route)
    e.preventDefault()
    e.stopPropagation();
    //navigate('/driver-list', route);
    // axios.post('/postRiderRoute', { data: submitRoute })
    // .then((result) => {
    //   console.log('posted updated route')
    // })
    // .catch((err) => {
    //   alert('There was an error finding drivers');
    // })
  }

  return (
    <div className="allDefaultView">
      <div className="defaultViewHeader">
      <div className="headerToggleView">
        <Link to="/driverview">
        <button>Switch to driver view</button>
        </Link></div>

      <div className="headerAvatar">
        <Link to="/riderprofile">
        <button>Avatar</button>
        </Link>
      </div>

      <div className="headerLogout"><MdLogout size={25}/></div>
      </div>

      <div>
      <h2>Welcome {name},</h2>
      </div>

      <h3>Find your nearest drivers</h3>
        <form>
        <div>
          <Autocomplete
            apiKey={'AIzaSyAEg8kOA_ww2St8FNAdPlWFu_WSUmSeSac'}
            style={{ width: "90%" }}
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
            apiKey={'AIzaSyAEg8kOA_ww2St8FNAdPlWFu_WSUmSeSac'}
            style={{ width: "90%" }}
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
          {/* <TimePicker onChange={(e) => this.handleChange(e, 'start_time')} value={'10:00'} /> */}
          <input type="text" name="StartTime" style={{ width: "90%" }} placeholder="Start time" onChange={(e) => setTime(e.target.value)}/> <br/>
          <input type="radio" value="SaveDefaultRoute"  name="default" onChange={(e) => setDef(true)} /> Set as default route <br/>
          {/* <input type="button" className="findDrivers" value="Find drivers" onClick={(e) => handleSubmit(e)}></input> */}
          <Link to="/driver-list" state={{route: route}}>
            <button>Find Drivers</button>
          </Link>
        </div>
        </form>
      {/* below all temporary placeholders */}
      <div>
        ______________________________ <br/>
        Ongoing Trip
      </div>
      <div>
        ______________________________ <br/>
        Upcoming Trip
      </div>
      <div>
        ______________________________ <br/>
        Default route <br />
        < DefaultRoute default_route={default_route}/>
      </div>
    </div>
  )
}

export default RiderView;