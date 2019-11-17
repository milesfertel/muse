import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const generateMidi = (() => {
    return;
  });

  const playMidi = (() => {
    return;
  });

  const handlePlayClick  = (() => {
    console.log("helloooooo");
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Muse!
        </p>

      <button onClick={handlePlayClick}>Play a tune</button>
      </header>
    </div>
  );
}

export default App;
