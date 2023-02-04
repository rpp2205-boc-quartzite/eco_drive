import React from "react";
import "./RiderList.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const RiderList = function(props) {
  console.log('FIRST RIDER', props.riders[0])

  const [riders, setRiders] = React.useState([]);
  const [totalRiders, setTotalRiders] = React.useState([]);
  const [acceptedRiders, setAcceptedRiders] = React.useState({})
  const [declined, setDeclined] = React.useState({});
  const [passedDriver, setPassedDriver] = React.useState(props.driverData);

  if (!riders.length) {
    setRiders(props.riders)
  }

  if (!totalRiders.length) {
    var ridersArray = [];
    for (var i = 0; i < props.seats; i++) {
      ridersArray.push(props.riders[i]);
    }
    setTotalRiders(ridersArray);
  };

  React.useEffect(() => {
    console.log(totalRiders);
  }, [totalRiders])


  const removeRider = (e) => {
    const container = declined;
    container[e.target.name] = true;
    var newRiders = []
    for (var i = 0; i < props.riders.length; i++) {
      if (container[props.riders[i].email] === undefined) {
        newRiders.push(props.riders[i]);
      }
    }
    var newTotal = newRiders.slice(0, props.seats)
    setDeclined(container);
    setTotalRiders(newTotal);
  };

  // const postCurrentRoutes = function() {
  //   return axios.post('/add-current-routes', {
  //     driver: props.driver,
  //     riderIDs: acceptedRiders
  //   })
  //     .then((results) => {
  //       console.log(results.data);
  //     })
  // }


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
        <br></br>
        {/* to be added when refactored */}
        {/* onClick={postCurrentRoutes} */}
        <Link to="/driverview" state={{driverData: passedDriver, riderData: totalRiders}}>
        <button className="start-trip"type="submit" >Accept Riders</button>
        </Link>
        <br></br>
        <div className="rider-card-list">
          {totalRiders.map((rider) => {
            return (
              <div className="rider-card" key={rider.email}>
                <button className="info-icon" type="submit">insert info icon here</button>
                <div className="rider-name">{rider.full_name}</div>
                {/* <div><img alt="specific user profile" className="rider-pic" src={rider.pic} /></div> */}
                {/* <div className="rider-from">{rider.startDistance.text} Miles from Your Pick-Up Location</div>
                <div className="rider-to">{rider.endDistance.text} Miles to go from Drop-Off Location</div> */}
                {/* <div className="rider-time">{rider.time}</div> */}
                <button className="remove-rider" name={rider.email} onClick={removeRider} type="submit">decline this rider</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default RiderList