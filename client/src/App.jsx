import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HelloWorld from './components/helloWorld.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import RiderView from './components/DefaultView/RiderView.jsx';
import { Login } from './components/Authentication/Login.jsx';
import { Register } from './components/Authentication/Register.jsx';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  // var testDB = () => {
  //   axios.post('database')
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err))
  // }

  // testDB();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HelloWorld />} />
        <Route path="/driverview" element={<DriverView />} />
        <Route path="/riderview" element={<RiderView />} />
      </Routes>
    {/* <HelloWorld /> */}
    {/* <DriverView /> */}
    {/* <div className="App">
      <HelloWorld />
      {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
  </div> */}
    </div>
  )
}

export default App;
