import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/Md';
import { HiOutlineRefresh } from 'react-icons/Hi';
import DefaultRoute from './DefaultRoute.jsx';
import DriverPrompt from './DriverPromptModal.jsx';
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DriverView ({ userId }) {
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
  const [showPrompt, setPrompt] = useState(false)

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
        <div className="viewToggle">Rider</div>
        <HiOutlineRefresh className="viewToggleButton" size={25} />
        </Link></div>

      <div className="headerAvatar">
        <Link to="/driverprofile">
        <button>Avatar</button>
        </Link>
      </div>

      <div className="headerLogout">
        <Link to="/">
        <MdLogout size={20}/>
        </Link>
      </div>
    </div>

      <div>
      <h2>Welcome {name},</h2>
      </div>

      {showPrompt ? <DriverPrompt show={showPrompt} close={closeModal} userId={userId}/> : ''}

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
          <input type="text" name="AvailableSeats" style={{ width: "90%" }} placeholder="Available seats" onChange={(e) => setSeats(Number(e.target.value))}/> <br/>
          <input type="radio" value="SaveDefaultRoute"  name="default" onChange={(e) => setIsDefault(true)} /> Set as default route <br/>
          <Link to="/rider-list" state={{route: route}}>
            <button className="primary-btn">Find Riders</button>
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
      < DefaultRoute userId={userId} upcoming={upcoming} />
      </div>

    </div>
  )
}

export default DriverView;