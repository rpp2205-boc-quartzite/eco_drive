import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const DefaultRoute = ({ userId, upcoming, view, favorites }) => {
  //const [route, setRoute] = useState(upcoming);
  const navigate = useNavigate()

  const route = {
    _id: userId,
    start_address: upcoming.start_address,
    start_lat: upcoming.start_lat,
    start_lng: upcoming.start_lng,
    end_address: upcoming.end_address,
    end_lat: upcoming.end_lat,
    end_lng: upcoming.end_lng,
    time: upcoming.time,
    default: upcoming.default,
    userFavorites: favorites
  }

  console.log(route)

  const handleClick = (e) => {
    e.preventDefault()
    if (view === 'rider') {
      navigate('/driver-list', {state: {route: route}})
    } else if (view === 'driver') {
      navigate('/rider-list', {state: {route: route}})
    }
  }

  if (upcoming.default) {
    return (
      <div className="defaultRouteCont">
        <div className="defaultRouteTitle">Default Route</div>
          <div className="defaultRouteContent">

            <div className="routeCard" onClick={(e) => handleClick(e)} >
              <div className="defaultFrom">
              <div className="defaultRouteCardTitle">From: </div>
              <div className="defaultRouteCardInfo"> {upcoming.start_address} </div>
              </div>

              <div className="defaultTo">
              <div className="defaultRouteCardTitle">To: </div>
              <div className="defaultRouteCardInfo"> {upcoming.end_address} </div>
              </div>

              <div className="defaultTime">
              <div className="defaultRouteCardTitle">Time: </div>
              <div className="defaultRouteCardInfo"> {upcoming.time} </div>
            </div>

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="defaultRouteTitle">Default Route</div>
          <div className="card">
            <p> No Default Route Set </p>
          </div>
      </div>
    )
  }
}

export default DefaultRoute;