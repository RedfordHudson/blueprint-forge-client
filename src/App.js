import logo from './logo.svg';
import './App.css';
import ResourcesList from './components/component.resourceslist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callAPI}>Fetch</button>
        <ResourcesList />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

function callAPI() {
  // const URL = 'http://localhost:3001';
  const URL = 'https://database-streamline-server.herokuapp.com/';
  fetch(URL+'resources')
    .then(response => response.json())
    .then(json => alert(JSON.stringify(json)));
}

export default App;
