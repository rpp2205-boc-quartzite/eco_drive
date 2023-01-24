import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import HelloWorld from './components/helloWorld';

function App() {
  // return (
  //   <HelloWorld />
  // )

  const addEntry = () => {
    axios.post('database', {})
      .then((res) => console.log('DONE'))
      .catch((err) => console.log('ERROR: ', err))
  }

  addEntry();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to refresh.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
