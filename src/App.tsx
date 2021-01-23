import React from 'react';
import logo from './logo.svg';
import './App.css';
import InstallButton from './components/InstallButton';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Hello James </p>
        <InstallButton />
      </header>
    </div>
  );
}

export default App;
