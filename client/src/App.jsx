import React from 'react';
import HelloWorld from './components/helloWorld.jsx';
import DriverView from './components/DefaultView/DriverView.jsx';
import axios from 'axios';

function App() {

  var testDB = () => {
    axios.post('database')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  testDB();

  return (
    // <HelloWorld />
    <DriverView />
  )
}

export default App;
