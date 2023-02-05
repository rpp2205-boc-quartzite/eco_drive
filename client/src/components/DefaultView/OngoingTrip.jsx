import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ongoing-trip-style.css';


const OngoingTrip = () => {

  const [user, setUser] = useState(null);
  const [driver,setDriver] = useState(null);

  useEffect(() => {
    console.log('got here');
  });

  return (
    <div className="ongoing-trip-container">
      <div className="ongoing-title">Onogoing Trip</div>
        <div className="card">
          <p> No Active Routes </p>
      </div>
    </div>
  )
}

export default OngoingTrip;

// class OngoingTrip extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//       driver: null
//     };
//   }

//   componentDidMount () {
//     console.log('heree', this.props.user);
//     axios.get('/getdriverview',  { params: {userId: this.props.user} })
//       .then(result => {
//         let user = result.data[0];
//         // console.log('USSSSEERRR:', user);
//         this.setState( { user } ); // set the user profile

//         if (user.rider_route.started) { // started route as a rider, get the driver
//           let driverId = user.rider_route.driver_id;
//           axios.get('/getdriverview', { params: {userId: driverId}})
//             .then(result => {
//               let driver = result.data[0];
//               // console.log('DRIVEERRRR:', driver);
//               this.setState( {driver} ); // set the driver profile
//             })
//             .catch(err => {
//               console.log('Failed');
//             })
//         }

//         console.log('THISSTA', this.state);

//       })
//       .catch(err => console.log('ERR: ', err))
//   }

//   endTrip () {
//     if (this.state.user.driver_route.started) {
//       axios.put(`/end-driver-route/${this.state.user._id}`)
//         .then(result => {
//           console.log('RESULT:', result);
//         })
//         .catch(err => console.log('ERROR HERE:', err))

//     } else if (this.state.user.rider_route.started) {
//       axios.put(`/end-rider-route/${this.state.user._id}`)
//         .then(result => {
//           console.log('RESULT:', result);
//         })
//         .catch(err => console.log('ERROR HERE:', err))
//     }
//   }

//   render () {
//     console.log('STATEE:', this.state);
//     // ongoing route as driver
//     if (this.state.user.driver_route.started) {
//       return (
//         <div className="ongoing-trip-container">
//           <div className="ongoing-title">Ongoing Trip</div>
//           <div className="card">
//             <div>
//               <div >
//                 <img src={this.state.user.avatar} alt="avatar" className='profilePhoto'/>
//               </div>
//               <span>{this.state.user.full_name}</span>
//               <span>Heart</span>
//               <span>Info</span>
//             </div>
//             <div className="detail"> {this.state.user.driver_route.start_address} </div>
//             <div className="detail"> {this.state.user.license_plate} </div>
//             <div className="detail"> {this.state.user.driver_route.time} </div>
//             <div className="buttons">
//               <button className="end-button">Cancel</button>
//               <button type='submit' onClick={this.endTrip.bind(this)} className="end-button" id="end-trip-button">End Trip</button>
//             </div>
//           </div>
//         </div>
//       )
//     // ongoing route as rider
//     } else if (this.state.user.rider_route.started) {
//       return (
//         <div className="ongoing-trip-container">
//           <div className="ongoing-title">Ongoing Trip</div>
//           <div className="card">
//             <div>
//               <div >
//                 <img src={this.state.driver.avatar} alt="avatar" className='profilePhoto'/>
//               </div>
//               <span>{this.state.driver.full_name}</span>
//               <span>Heart</span>
//               <span>Info</span>
//             </div>
//             <div className="detail"> {this.state.user.rider_route.start_address} </div>
//             <div className="detail"> {this.state.driver.license_plate} </div>
//             <div className="detail"> {this.state.user.rider_route.time} </div>
//             <div className="buttons">
//               <button className="end-button">Cancel</button>
//               <button type='submit' onClick={this.endTrip.bind(this)} className="end-button" id="end-trip-button">End Trip</button>
//             </div>
//           </div>
//         </div>
//       )
//     // no ongoing routes
//     } else {
//       return (
//         <div className="ongoing-trip-container">
//           <div className="ongoing-title">Onogoing Trip</div>
//             <div className="card">
//               <p> No Active Routes </p>
//             </div>
//         </div>
//       )
//     }
//   }
// }

// export default OngoingTrip;