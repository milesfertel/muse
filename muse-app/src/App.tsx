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
      //generate MIDI number between 36 & 84 (C2 thru C6)
      midiNotes[i] = Math.floor(Math.random() * 84) + 36;
    }

    return midiNotes;
  };

  playMidi = (midiNotes: number[]) => {
    let output = webmidi.outputs[0];
    console.log(output);
    console.log("Play Midi");
    output.playNote("C4");
    //for (var i = 0; i < midiNotes.length; i++) {
    //  // Change this to have a delay and duration
    //  console.log(midiNotes[i]);
    //  output.playNote("C4");
    //}
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
