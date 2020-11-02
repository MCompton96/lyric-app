import React from 'react';
import * as util from '../utils';
import * as songApi from '../API/songsApi';
import * as lyricsApi from '../API/lyricsApi';

class SecondArtistData extends React.Component {
    state = {
        lyricsAverage: 0,
        lyricsMax: 0,
        lyricsMin: 0,
        lyrics: [],
        isLoading: true
    }

    getData = () => {
        songApi.getReleases(this.props.artist)
            .then(({ data }) => {
              return data.releases.map((song) => {
                return lyricsApi.getLyrics(this.props.artist, song.title)
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

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevState.artist !== this.state.artist) {
          this.getData();
        }
      }

    render() {
        const { lyricsAverage, lyricsMax, lyricsMin, isLoading } = this.state;
        const { handleReset} = this.props;
        return(
            <div>
                {isLoading ? <p>Data is Loading...</p> : 
    <>
    <p>Average Word Count: {lyricsAverage.toFixed(2)}</p>
    <p>Min Song Length: {lyricsMin} words</p>
    <p>Max Song Length: {lyricsMax} words</p>
    <button onClick={handleReset}>Reset Data</button>
    </>
    }
            </div>
        )
    }
}

export default SecondArtistData;