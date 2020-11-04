import React from 'react';
import * as songApi from '../API/songsApi';
import * as lyricsApi  from '../API/lyricsApi';
import * as util from '../utils';
import Loader from './Loader';
import styles from './Data.module.css';

class Data extends React.Component {
    state = {
        lyricsAverage: 0,
        lyricsMax: 0,
        lyricsMin: 0,
        lyrics: [],
        isLoading: true,
    }
    
    // getData = () => {
    //   const regex = /\([^)]*\)/
    //   songApi.getReleases(this.props.artist)
    //   .then(async ({ data }) => {
    //     return  await Promise.allSettled(data.recordings.map(song => {
    //       let formattedSongTitle = song.title.replace(regex, '');
    //       return lyricsApi.getLyrics(this.props.artist, formattedSongTitle)
    //     }))
    //   })
    //   .then ((res) => {
    //     const lyrics = util.formatLyrics(res);
    //     const average = util.getAverage(lyrics);
    //     const max = util.getMax(lyrics);
    //     const min = util.getMin(lyrics);
    //     this.setState({ 
    //       lyrics: util.formatLyrics(res), 
    //       isLoading: false,
    //       lyricsAverage: average,
    //       lyricsMax: max,
    //       lyricsMin: min
    //     })
    //   })
    // }

  getData = () => {
      const regex = /\([^)]*\)/
      songApi.getReleases(this.props.artist)
          .then(({ data }) => {
            return data.recordings.map((song) => {
              let formattedSongTitle = song.title.replace(regex, '');
              return lyricsApi.getLyrics(this.props.artist, formattedSongTitle)
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
              .catch(err => {
                this.setState({ err: err.response, isLoading: false})
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
        const { lyricsAverage, lyricsMax, lyricsMin, isLoading} = this.state;
        const { handleReset} = this.props;
    return(
        <div className={styles.container}>
            {isLoading ? <Loader /> : 
                <>
                <div className={styles.data}>
                <p>Average Word Count: {lyricsAverage.toFixed(2)}</p>
                <p>Min Song Length: {lyricsMin} words</p>
                <p>Max Song Length: {lyricsMax} words</p>
                </div>
                <button onClick={handleReset} className={styles.button}>Reset Data</button>
                </>
            }
        </div>
    )
  }
}

export default Data;