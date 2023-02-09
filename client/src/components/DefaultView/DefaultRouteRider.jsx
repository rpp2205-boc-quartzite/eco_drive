import React from 'react';
import { useNavigate } from 'react-router-dom'

const DefaultRouteRider = ({ userId, defaultRoute, favorites, userInfo, from, startedTrip, upcomingCheck }) => {
  const navigate = useNavigate()

  const route = {
    _id: userId,
    start_address: defaultRoute.start_address,
    start_lat: defaultRoute.start_lat,
    start_lng: defaultRoute.start_lng,
    end_address: defaultRoute.end_address,
    end_lat: defaultRoute.end_lat,
    end_lng: defaultRoute.end_lng,
    time: defaultRoute.time,
    default: defaultRoute.default,
    userFavorites: favorites
  }

  // console.log('can start default trip?', startedTrip, upcomingCheck)
  const handleClick = (e) => {
    e.preventDefault()
    if (!startedTrip && !upcomingCheck) {
      navigate('/driver-list', {state: {route: route, userInfo: userInfo, from: from}})
    }
  }

  return (
    <div className="defaultRouteCont">
      <div className="defaultRouteTitle">Default Route</div>
        <div className="defaultRouteContent">

          <div className="routeCard" onClick={(e) => handleClick(e)} >
            <div className="defaultFrom">
            <div className="defaultRouteCardTitle">From: </div>
            <div className="defaultRouteCardInfo"> {defaultRoute.start_address} </div>
            </div>

            <div className="defaultTo">
            <div className="defaultRouteCardTitle">To: </div>
            <div className="defaultRouteCardInfo"> {defaultRoute.end_address} </div>
            </div>

            <div className="defaultTime">
            <div className="defaultRouteCardTitle">Time: </div>
            <div className="defaultRouteCardInfo"> {defaultRoute.time} </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DefaultRouteRider;