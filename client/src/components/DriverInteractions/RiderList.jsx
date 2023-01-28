import React from "react";
import "./DriverInteractions.css";

const RiderList = function(props) {

  if (!props.riders || !props.riders.length) {
    return "No Riders Available. Check Back at a Later Time"
  }

  return (
    <div className="rider-card-list">
      {props.riders.map((rider) => {
        return (
          <div className="rider-card" key={rider.name}>
            <button className="info-icon" type="submit">insert info icon here</button>
            <div className="rider-name">{rider.name}</div>
            {/* <div><img alt="specific user profile" className="rider-pic" src={rider.pic} /></div> */}
            <div className="rider-from">{rider.from} Miles from Your Pick-Up Location</div>
            <div className="rider-to">{rider.to} Miles to go from Drop-Off Location</div>
            <div className="rider-time">{rider.time}</div>
          </div>
        )
      })}
    </div>
  )
}

export default RiderList