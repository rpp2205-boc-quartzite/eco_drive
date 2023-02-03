import React from "react";
import "./RiderList.css";

const RiderList = function(props) {

  const [seats, setSeats] = React.useState(props.riders[0].seats)
  const [riders, setRiders] = React.useState([]);

  if (!riders.length) {
    setRiders(props.riders)
  };

  if (seats > props.riders.length) {
    setSeats(props.riders.length)
  };

  React.useEffect(() => {
    console.log('Change to riders state');
  }, [riders])

  const removeRider = (e) => {
    var newRiders = []
    for (var i = 0; i < riders.length; i++) {
      if (e.target.name !== riders[i].rider.email) {
        newRiders.push(riders[i]);
      }
    }
    setRiders(newRiders)
  };

  if (!riders || !riders.length) {
    return (
      <div className='loading-screen'>
    <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
    <p>Loading Riders...</p>
 </div>
    )
  } else {
    return (
      <div className="rider-card-list">
        {riders.map((rider) => {
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
    )
  }
}

export default RiderList