import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/Md';
import { HiOutlineRefresh } from 'react-icons/Hi';
import DefaultRoute from './DefaultRoute.jsx';
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [avatar, setAvatar] = useState('');
  const [displayTime, setDisplayTime] = useState(new Date());
  const [time, setTime] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [upcoming, setUpcoming] = useState({});

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
    default: isDefault
  }

  useEffect(() => {
    axios.get('/getriderview', { params: {userId} })
    .then((result) => {
      setAvatar(result.data[0].avatar)
      setName(result.data[0].full_name)
      setUpcoming(result.data[0].rider_route)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="allDefaultView">
      <div className="defaultViewHeader">
      <div className="headerToggleView">
        <Link to="/driverview">
          <div className="viewToggle">Driver</div>
          <HiOutlineRefresh className="viewToggleButton" size={25}/>
        </Link> </div>

      <div className="headerAvatar">
        <Link to="/riderprofile">
        <button>Avatar</button>
        </Link> </div>

      <div className="headerLogout">
        <Link to="/">
        <MdLogout size={20}/>
        </Link>
      </div>
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
          <DatePicker
                selected={displayTime}
                onChange={(date) => {
                  setTime(format(displayTime, 'hh:mm aa'));
                  setDisplayTime(new Date(date));
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
          <input type="radio" value="SaveDefaultRoute"  name="default" onChange={(e) => setIsDefault(true)} /> Set as default route <br/>
          <Link to="/driver-list" state={{route: route}}>
            <button className="primary-btn">Find Drivers</button>
          </Link>
        </div>
        </form>

      <div>
        ______________________________ <br/>
        Ongoing Trip
      </div>
      <div>
        ______________________________ <br/>
        UpcomingTrip
      </div>
      <div>
        < DefaultRoute userId={userId} upcoming={upcoming} />
      </div>
    </div>
  )
}

export default RiderView;