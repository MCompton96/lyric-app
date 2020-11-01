import './App.css';
// import axios from 'axios';
import React from 'react';
import * as songApi from './songsApi';
import * as lyricsApi from './lyricsApi';
import * as util from './utils';


class App extends React.Component {
  
  state = {
    artist: 'coldplay',
    lyrics: [],
    lyricsAverage: 0,
    lyricsMax: 0,
    lyricsMin: 0,
    isLoading: true,
    isSubmitted: false
  }
  
  getData = () => {
    songApi.getReleases(this.state.artist)
        .then(({ data }) => {
          return data.releases.map((song) => {
            return lyricsApi.getLyrics(this.state.artist, song.title)
            .then(({ data }) => {
              this.setState((currState) => {
                if (data.lyrics) {
                  return { lyrics: [...currState.lyrics, util.formatLyrics(data.lyrics)], isLoading: false}
                }
              })
            })
            .then(() => {
              const average = util.getAverage(this.state.lyrics);
              const max = util.getMax(this.state.lyrics);
              const min = util.getMin(this.state.lyrics);
              this.setState({ lyricsAverage: average, lyricsMax: max, lyricsMin: min, isLoading: false})
            })
          })
        })
  }

  handleChange = (event) => {
      const value = event.target.value;
      this.setState({ artist: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitted: true})
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.artist !== this.state.artist) {
      this.getData();
    }
  }

  render() {
    const { isLoading, lyricsAverage, lyricsMax, lyricsMin, isSubmitted} = this.state;
    
    return (
      <div className="App">
          <form onSubmit={this.handleSubmit}>
            <label>
              <span>Music Artist:&nbsp;</span>
              <input onChange={this.handleChange}/>
              <button>Submit</button>
            </label>
          </form>
    {isSubmitted ? (isLoading ? <p>Data is Loading...</p> : 
    <>
    <p>Average Word Count: {lyricsAverage.toFixed(2)}</p>
    <p>Min Song Length: {lyricsMin} words</p>
    <p>Max Song Length: {lyricsMax} words</p>
    </>
    ) : null}
      </div>
    )
  }
  
}

export default App;
