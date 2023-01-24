import React from 'react';
import HelloWorld from './components/helloWorld.jsx';
import axios from 'axios';

function App() {

  var testDB = () => {
    axios.post('database')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  testDB();

  return (
    <HelloWorld />
  )
}

export default App;
