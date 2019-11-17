import React from 'react';
import logo from './logo.svg';
import './App.css';

import webmidi from "webmidi";

enum Mode {
  WAIT,
  LISTEN,
  PLAY,
  FAIL,
  SUCCEED
};

interface Props {
  handleClick: any;
};

interface State {
  gameMode: Mode;
  midi: number[];
  noteCounter: number;
};

const PlayButton: React.FC<Props> = (props) => {
  return (
    <button onClick={props.handleClick}>
      Play a tune
    </button>
  );
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      gameMode: Mode.WAIT,
      midi: [],
      noteCounter: 0,
    };
    webmidi.enable(function (err) {
      if (err) {
        console.log("webmidi could not be enabled.", err);
      } else {
        console.log("webmidi was enabled");
      }
    });
  }

  generateMidi = () => {
    //create an array of eight random frequencies
    let midiNotes = new Array(8);
    for (var i = 0; i < 8; i++) {
      //generate MIDI number between 36 & 72 (C2 thru C6)
      midiNotes[i] = Math.floor(Math.random() * (72 - 36 + 1) + 36);
    }
    console.log("getMidi" + midiNotes);
    return midiNotes;
  };

  playMidi = (midi: number[]) => {
    console.log("Playmidi" + midi);

    let context = new AudioContext();
    let osc = context.createOscillator();
    
    for (var i = 0; i < midi.length; i++) {
      //change to frequency
      osc.frequency.setValueAtTime(Math.pow(2, (midi[i]-69)/12) * 440, context.currentTime + i);
    }
    osc.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + midi.length);
    
    };

  handlePlayClick: any = () => {
    let midiNotes = this.generateMidi();
    this.setState({
      gameMode: Mode.PLAY,
      midi: midiNotes,
    });
    this.playMidi(this.state.midi);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Muse!
          </p>
          <PlayButton handleClick={this.handlePlayClick}></PlayButton>
        </header>
      </div>
    );
  }
}

export default App;
