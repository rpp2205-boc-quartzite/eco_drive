import React, { useState } from "react";
import HelloWorld from './components/helloWorld.jsx';
import axios from 'axios';
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
    <div className="App">
      <HelloWorld />
      {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
  </div>
  );
}

export default App;
