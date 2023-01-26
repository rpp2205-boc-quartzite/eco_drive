import React from 'react';
import HelloWorld from './components/helloWorld.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import DriverProfile from './components/UserProfile/DriverProfile.jsx'
import RiderProfile from './components/UserProfile/RiderProfile.jsx'
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'

function App() {

  var testDB = () => {
    axios.post('database')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  testDB();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HelloWorld />} />
        <Route path="/driverview" element={<DriverView />} />
        <Route path="/riderview" element={<RiderView />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/riderprofile" element={<RiderProfile />} />
      </Routes>
    {/* <HelloWorld /> */}
    {/* <DriverView /> */}
    </div>
  )
}

export default App;
