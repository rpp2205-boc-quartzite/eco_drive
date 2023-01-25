import React from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";
import { Link } from 'react-router-dom'
// import TimePicker from 'react-time-picker';

class RiderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticatedUserID: '', // The successfully authenticated user's ID, not sure whether this prop will be necessary
      userName: '',
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

  handleSubmit() {
    console.log(this.state)
    var route = this.state;
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
      <div>
        <div className="defaultViewHeader">
        <div className="headerToggleView">
          <Link to="/driverview">
          <button>Switch to driver view</button>
          </Link></div>
        <p className="headerAvatar">Profile photo</p>
        </div>

        <div>
        <h2>Welcome [name],</h2>
        </div>

        <h3>Find your nearest drivers</h3>
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

            <input type="radio" value="SaveDefaultRoute"  name="default"/> Set as default route <br/>
            <button type="Submit" className="findRiders" onClick={this.handleSubmit}>Find drivers</button>
          </div>
          </form>
{/* below is all temporary */}
        <div>
          _____________________________________________ <br/>
          Ongoing Trip
        </div>
        <div>
          _____________________________________________ <br/>
          Upcoming Trip
        </div>
        <div>
          _____________________________________________ <br/>
          Default route
        </div>
      </div>
    )
  }
}

export default RiderView;