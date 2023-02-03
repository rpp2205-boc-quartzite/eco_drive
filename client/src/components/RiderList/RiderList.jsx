import React from "react";
import "./RiderList.css";
import { Link } from 'react-router-dom';

const RiderList = function(props) {

  // console.log('Driver Data', props.driver)
  // console.log('Rider Data', props.riders)
  const [riders, setRiders] = React.useState([]);
  const [totalRiders, setTotalRiders] = React.useState([]);
  const [declined, setDeclined] = React.useState({});

  const startLocal = function() {
    if (typeof window !== 'undefined') {
      if (localStorage['declined'] === undefined) {
        var data = JSON.stringify(declined)
        localStorage.setItem('declined', data)
      }
    }
  }

  const checkLocal = function(){
    var check = localStorage.getItem('declined');
    var converted = JSON.parse(check)
    setDeclined({converted})
     //localStorage.removeItem('declined');
  }


  if (!riders.length) {
    setRiders(props.riders)
  }

  if (!totalRiders.length) {
    var ridersArray = [];
    for (var i = 0; i < props.seats.total; i++) {
      ridersArray.push(props.riders[i]);
    }
    setTotalRiders(ridersArray);
  };

  React.useEffect(() => {
    console.log(totalRiders);
  }, [totalRiders])


  const removeRider = (e) => {
    startLocal();
    checkLocal();
    const container = declined;
    container[e.target.name] = true;
    var newRiders = []
    for (var i = 0; i < props.riders.length; i++) {
      console.log(`RIDERS after ${i}`, props.riders)
      console.log('EMAIL ', props.riders[i].rider.email)
      if (container[props.riders[i].rider.email] === undefined) {
        newRiders.push(props.riders[i]);
      }
    }
    var newTotal = newRiders.slice(0, props.seats.total)
    setDeclined(container);
    setTotalRiders(newTotal);
  };

  const postCurrentRoutes = function(driver, ridersArray) {
    //get final rider data from next page
    // create one button to "accept Riders"
    //post dats to DB
    // move Accept Riders button to rider List?
  }

  if (!riders || !riders.length) {
    return (
      <div className='loading-screen'>
    <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
    <p>Loading Riders...</p>
 </div>
    )
  } else {
    return (
      <div>
        <Link to="/driverview" >
        <button className="start-trip"type="submit">Start Trip</button>
        </Link>
        <br></br>
        <div className="rider-card-list">
          {totalRiders.map((rider) => {
            return (
              <div className="rider-card" key={rider.rider.email}>
                <button className="info-icon" type="submit">insert info icon here</button>
                <div className="rider-name">{rider.rider.full_name}</div>
                {/* <div><img alt="specific user profile" className="rider-pic" src={rider.pic} /></div> */}
                <div className="rider-from">{rider.startDistance.text} Miles from Your Pick-Up Location</div>
                <div className="rider-to">{rider.endDistance.text} Miles to go from Drop-Off Location</div>
                {/* <div className="rider-time">{rider.time}</div> */}
                <button className="remove-rider" name={rider.rider.email} onClick={removeRider} type="submit">decline this rider</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default RiderList