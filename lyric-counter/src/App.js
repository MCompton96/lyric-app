import './App.css';
// import axios from 'axios';
import React from 'react';
import * as songApi from './songsApi';
import * as lyricsApi from './lyricsApi';
import * as util from './utils';


class App extends React.Component {
  
  state = {
    artist: '',
    lyrics: [],
    lyricsAverage: 0,
    isLoading: true,
    submitted: false
  }
  
  componentDidMount() {
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
          this.setState({ lyricsAverage: average, isLoading: false})
        })
      })
    })
  }

  handleChange = (event) => {
      const value = event.target.value;
      this.setState({ artist: value})
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ submitted: true })
  }

  render() {
    const { isLoading, lyricsAverage, submitted } = this.state;
    
    return (
      <div>
        {isLoading ? <p>Page is Loading</p> : (
          <>
          <form>
            <label>
              <span>Music Artist:&nbsp;</span>
              <input onChange={this.handleChange}/>
              <button onClick={this.handleClick}>Submit</button>
            </label>
          </form>
        <p>Average: {submitted ? <span>{lyricsAverage.toFixed(2)}</span> : <span>0</span>}</p>
          </>
        )}
      </div>
    )
  }
  
}

export default App;
