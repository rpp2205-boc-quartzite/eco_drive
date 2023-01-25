import React from 'react';
import axios from 'axios';
import Autocomplete from "react-google-autocomplete";

class DriverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticatedUserID: '', // The successfully authenticated user's ID, not sure what Blake will call this prop yet
      userName: '',
      start_address: '',
      end_address: '',
      time: '',
      total_seats: '',
      avatar: ''
    };
  }

  render () {
    return (
      <div>
        <div>Switch to Rider View</div>
        <h2>Welcome [name],</h2>
        <h3>Find your nearest riders</h3>
          <form>
          <div>
            <Autocomplete
              apiKey={'AIzaSyAEg8kOA_ww2St8FNAdPlWFu_WSUmSeSac'}
              style={{ width: "90%" }}
              placeholder="Starting point"
              onPlaceSelected={(place) => {
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
                console.log(place);
              }}
              options={{
                types: ["address"],
                componentRestrictions: { country: "us" },
              }}
            />
            <input type="text" name="StartTime" style={{ width: "90%" }} placeholder="Start time"/> <br/>
            <input type="text" name="AvailableSeats" style={{ width: "90%" }} placeholder="Available seats"/> <br/>
            <input type="radio" value="SaveDefaultRoute"  name="default"/> Set as default route <br/>
            <button type="Submit" className="findRiders">Find riders</button>
          </div>
          </form>



      </div>
    )
  }
}

export default DriverView;