import React from 'react';
import { useNavigate } from 'react-router-dom'

const DefaultRouteDriver = ({ userId, upcoming, view, favorites, dir, route }) => {
  const navigate = useNavigate()

  console.log(route)

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/rider-list', {state: {dir: dir, route: route}})
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

export default DefaultRouteDriver;