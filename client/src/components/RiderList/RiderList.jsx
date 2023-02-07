import React from "react";
import "./RiderList.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const RiderList = function(props) {

  const [totalRiders, setTotalRiders] = React.useState(['no', 'riders']);
  const [acceptedRiders, setAcceptedRiders] = React.useState({})
  const [declined, setDeclined] = React.useState({});
  const [passedDriver, setPassedDriver] = React.useState(props.driverData);

    var localDeclined = localStorage.getItem("declined");
    var parsedLocalDeclined = JSON.parse(localDeclined);
    setDeclined(parsedLocalDeclined);


    if (props.riders.length) {
      var seats = props.seats;
      if (seats > props.riders.length) {
        seats = props.riders.length;
      }
      var ridersArray = [];
      for (var i = 0; i < seats; i++) {
        ridersArray.push(props.riders[i]);
      }
      setTotalRiders(ridersArray);
    }



  const removeRider = (e) => {
    const container = declined;
    container[e.target.name] = true;
    var newRiders = []
    for (var i = 0; i < props.riders.length; i++) {
      if (container[props.riders[i].profile.email] === undefined) {
        newRiders.push(props.riders[i]);
      }
    }
    var seats = props.seats;
    if (seats > props.riders.length) {
      seats = props.riders.length;
    }
    var newTotal = newRiders.slice(0, seats)
    setDeclined(container);
    var parsedContsainer = JSON.parse(container);
    localStorage.setItem("declined", parsedContsainer);
    setTotalRiders(newTotal);
  };



  if (totalRiders[0] === 'no') {
    return (
      <div>No Riders Have Booked you Yet... But Don't Worry! Check back shortly to see your Riders!</div>
      // <div className='loading-screen'>
      //   <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
      //   <p>Loading Riders...</p>
      // </div>
    )
  } else {
    return (
      <div>
        <br></br>
        <Link to="/driverview" state={{driverData: passedDriver, riderData: totalRiders}}>
        <button className="start-trip"type="submit" >Accept Riders</button>
        </Link>
        <br></br>
        <div className="rider-card-list">
          {totalRiders.map((rider) => {
            console.log("RIDER: ", rider)
            return (
              <div className="rider-card" key={rider.profile.email}>
                <button className="info-icon" type="submit">insert info icon here</button>
                <div className="rider-name">{rider.profile.full_name}</div>
                <div><img alt="specific user profile" className="rider-pic" src={rider.profile.avatar} /></div>
                <div className="rider-from">{rider.riderID.starting_distance} from Your Pick-Up Location</div>
                <div className="rider-to">{rider.riderID.end_distance} from Drop-Off to Final Destination</div>
                {/* <div className="rider-time">{rider.time}</div> */}
                <button className="remove-rider" name={rider.profile.email} onClick={removeRider} type="submit">decline this rider</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default RiderList