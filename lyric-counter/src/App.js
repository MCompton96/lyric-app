import './App.css';
import React from 'react';
import Data from './components/Data';
import SecondArtistData from './components/SecondArtistData';


class App extends React.Component {
  
  state = {
    artist: 'coldplay',
    secondArtist: 'coldplay',
    isSubmitted: false,
    showCompare: false
  }  

  handleChange = (event, artist) => {
    const value = event.target.value;
    if (artist === 'firstArtist') {
        this.setState({ artist: value})
    } else {
        this.setState({ secondArtist: value})  
    }  
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitted: true})
  }

  handleReset = () => {
    this.setState({ artist: 'coldplay', isSubmitted: false})
  }

  handleCompare = () => {
    this.setState({ showCompare: true })
  }

  render() {
    const { isSubmitted, artist, showCompare, secondArtist } = this.state;
    
    return (
      <div className="App">
          <form onSubmit={this.handleSubmit}>
            <label>
              <span>Music Artist:&nbsp;</span>
              <input onChange={(event) => {
                return this.handleChange(event, 'firstArtist')
              }}/>
              <button>Submit</button>
            </label>
          </form>
    {isSubmitted ? <Data artist={artist} handleReset={this.handleReset}/> : null}
    {showCompare ? (
    <>
    <form onSubmit={this.handleSubmit}>
            <label>
              <span>Music Artist:&nbsp;</span>
              <input onChange={(event) => {
                return this.handleChange(event, 'secondArtist')
              }}/>
              <button>Submit</button>
            </label>
          </form>
    {isSubmitted ? <SecondArtistData artist={secondArtist} handleReset={this.handleReset}/> : null}
    </>
    ) : null}
      </div>
    )
  }
  
}

export default App;
