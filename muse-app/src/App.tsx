import React from 'react';
import WebMidi from 'webmidi';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const generateMidi = (() => {
    
    let context = new AudioContext();
    let osc = context.createOscillator();

    //create an array of eight random frequencies
    let noteArray = new Array(8);
    for (var i = 0; i < 8; i++) {
      //generate MIDI number between 36 & 84 (C2 thru C6)
      noteArray[i] = Math.floor(Math.random() * 84) + 36;
      //convert note identifier to frequency
      noteArray[i] = Math.pow(2, (noteArray[i]-69)/12)*440;
    }
    
    return noteArray;
  });

  const playMidi = (() => {
    let noteArray = generateMidi();
    WebMidi.enable(function (err) {

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log(WebMidi.outputs[0]);
        let output = WebMidi.outputs[0];
        for (var i = 0; i < noteArray.length; i++){
          output.playNote(noteArray[i]);
        }
      }
      
    });

    return;
  });

  const handlePlayClick  = (() => {
    console.log("helloooooo");
    playMidi();
  });
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
  }

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
