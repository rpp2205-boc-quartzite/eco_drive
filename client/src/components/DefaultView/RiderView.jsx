import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/Hi';
import DefaultRoute from './DefaultRoute.jsx';
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiKey from './apikey.js';

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
  const key = ApiKey;

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
          </Link>
        </div>
        <div className="headerAvatarLogout">
          <div className="headerAvatar">
            <Link to="/riderprofile">
            <button>Avatar</button>
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
                  apiKey={key}
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
                    className="inputField2"
                    apiKey={key}
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
                      className="inputField3"
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
              <div className="defaultRadioCont">
                <input type="radio" className="radioInput" onChange={(e) => setIsDefault(true)}/> <div className="saveDefaultText">Set as default route</div>
              </div>
            </div>

            <Link to="/driver-list" state={{route: route}}>
              <button className="primary-btn-find">Find Drivers</button>
            </Link>
          </div>
        </form>

      {/* <div>
        ______________________________ <br/>
        Ongoing Trip
      </div>
      <div>
        ______________________________ <br/>
        UpcomingTrip
      </div> */}
      <div>
        < DefaultRoute userId={userId} upcoming={upcoming} />
      </div>
    </div>
  )
}

export default RiderView;