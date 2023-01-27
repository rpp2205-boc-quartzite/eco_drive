import React from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/Md'

class DriverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '63d36ee5cd478f26557c4a38', // The authenticated user's ID, hardcoded until prop received
      full_name: '',
      start_address: '',
      start_lat: '',
      start_lng: '',
      end_address: '',
      time: '',
      total_seats: '',
      end_lat: '',
      end_lng: '',
      avatar: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    var id = this.state.userId;
    axios.get('/getdriverview', { params: {id} })
    .then((result) => {
      console.log('got da driver', result)
      this.setState({
        full_name: result.data[0].full_name
      })
    })
    .catch(err => console.log(err))
  }

  handleSubmit(e) {
    console.log(this.state)
    e.preventDefault()
    // var route = this.state;
    // Write to the user's document in db
    // route to Riders List
  }

  handleChange (e, field) {
    if (field === 'start_address') {
      var lat = e.geometry.location.lat();
      var lng = e.geometry.location.lng();
      this.setState({
        start_address: e.formatted_address,
        start_lat: lat,
        start_lng: lng
      })
    } else if (field === 'end_address') {
      lat = e.geometry.location.lat();
      lng = e.geometry.location.lng();
      this.setState({
        end_address: e.formatted_address,
        end_lat: lat,
        end_lng: lng
      })
    } else if (field === 'start_time') {
        this.setState({ time: e.target.value })
    } else if (field === 'total_seats') {
      this.setState({ total_seats: e.target.value})
    }
  }

  render () {
    return (
      <div className="allDefaultView">
        <div className="defaultViewHeader">
        <div className="headerToggleView">
          <Link to="/riderview">
          <button>Switch to rider view</button>
          </Link></div>
        <div className="headerAvatar"><p>Avatar</p></div>
        <div className="headerLogout"><MdLogout size={25}/></div>
        </div>

        <div>
        <h2>Welcome {this.state.full_name},</h2>
        </div>

        <h3>Find your nearest riders</h3>
          <form>
          <div>
            <Autocomplete
              apiKey={'AIzaSyAEg8kOA_ww2St8FNAdPlWFu_WSUmSeSac'}
              style={{ width: "90%" }}
              placeholder="Starting point"
              onPlaceSelected={(place) => {
                this.handleChange(place, 'start_address')
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
                this.handleChange(place, 'end_address')
                console.log(place);
              }}
              options={{
                types: ["address"],
                componentRestrictions: { country: "us" },
              }}
            />
            {/* <TimePicker onChange={(e) => this.handleChange(e, 'start_time')} value={'10:00'} /> */}
            <input type="text" name="StartTime" style={{ width: "90%" }} placeholder="Start time" onChange={(e) => this.handleChange(e, 'start_time')}/> <br/>
            <input type="text" name="AvailableSeats" style={{ width: "90%" }} placeholder="Available seats" onChange={(e) => this.handleChange(e, 'total_seats')}/> <br/>
            <input type="radio" value="SaveDefaultRoute"  name="default"/> Set as default route <br/>
            <input type="button" className="findRiders" value="Find riders" onClick={(e) => this.handleSubmit(e)}></input>
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
          Default route
        </div>
      </div>
    )
  }
}

export default DriverView;