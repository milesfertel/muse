import React from 'react';
import logo from './logo.svg';
import './App.css';

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

  generateMidi = () => {
    return [];
  };

  playMidi = (midiNotes: number[]) => {
    console.log(midiNotes);
    return;
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
