import React from "react";
import "./RiderList.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const RiderList = function(props) {

  const driverID = props.driver.id;
  // console.log('RIDERS_BACK: ', props.riders)


  const [totalRiders, setTotalRiders] = React.useState(['no', 'riders']);


React.useEffect(() => {
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
  } else {
    setTotalRiders(['no', 'riders']);
  }

}, [props])

  const removeRider = (e) => {
    e.preventDefault();
    var riderID = e.target.id;
   axios.post("/rider-remove", {
      driverID: driverID,
      riderID: riderID
    })
    .then((results) => {
      console.log('RESULTS BACK', results.data);
    })
    .catch((err) => {
      console.log('Error: ', err)
    })

  };

  const riderListFun = function() {

    if (totalRiders[0] === 'no') {
      return (
        <div>No Riders Have Booked you Yet... But Don't Worry! Check back shortly to see your Riders!</div>
      )
    } else {
      return (
        <div>
          <br></br>
          {/* state={{driverData: passedDriver, riderData: totalRiders}} */}
          <Link to="/driverview">
          <button className="start-trip"type="submit" >Accept Riders</button>
          </Link>
          <br></br>
          <div className="rider-card-list">
            {totalRiders.map((rider) => {
              // console.log("RIDER: ", rider)
              return (
                <div className="rider-card" key={rider.profile.email}>
                  <button className="info-icon" type="submit">insert info icon here</button>
                  <div className="rider-name">{rider.profile.full_name}</div>
                  <div><img alt="specific user profile" className="rider-pic" src={rider.profile.avatar} /></div>
                  <div className="rider-from">{rider.riderID.starting_distance} from Your Pick-Up Location</div>
                  <div className="rider-to">{rider.riderID.end_distance} from Drop-Off to Final Destination</div>
                  <div className="rider-time">{rider.riderID.time}</div>
                  <button className="remove-rider" id={rider.riderID.rider_id} type="submit" onClick={removeRider}>decline this rider</button>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

  }

  return (
    riderListFun()
  )

}

export default RiderList