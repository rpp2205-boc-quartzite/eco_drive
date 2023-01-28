import React, {useState} from 'react';
import DriverInteractions from './DriverInteractions.jsx'
import { Circles } from 'react-loader-spinner';



export default function Placeholder() {
  const [ridersArray, setRidersArray] = useState([
    {
      name: "Suzy Thompson",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .25,
      to: .10,
      time: "9:00am",
    },
    {
      name: "Mark Manchin",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .62,
      to: .05,
      time: "9:00am",
    },
    {
      name: "Trouble Maker",
      pic: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      from: .02,
      to: .02,
      time: "9:00am",
    }
  ])

  const route = {
    avatar: "",
    end_address: "Los Angeles, CA, USA",
    end_lat: 37.890053,
    end_lng: -122.2716059,
    full_name: "Eco Friendly Driver",
    start_address: "Los Angeles River Bike Path, Los Angeles, CA, USA",
    start_lat: 34.1318486,
    start_lng: -118.2745054,
    time: "9:00am",
    total_seats: "2",
    userId: "63d244c024407b7b0ddb7ed0",
  }

  const [directions, setDirections] = useState(null);



    React.useEffect( ()=> {
      async function calculateRoute() {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: route.start_address,
          destination: route.end_address,
          travelMode: google.maps.TravelMode.DRIVING
        })

        if (results.status === 'OK') {
          setDirections({
            direction: results,
            distance: results.routes[0].legs[0].distance.text,
            duration: results.routes[0].legs[0].duration.text
          });
          console.log(results);
        } else {
          console.log("Error: ", results.status)
        }
      }
      calculateRoute();
    }, [])


    if (!directions) {
      return (
        <Circles />
      )
    } else {
      return (
        <DriverInteractions riders={ridersArray} route={route} directions={directions}/>
      )
    }
}