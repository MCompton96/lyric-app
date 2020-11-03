import React from 'react';
import * as songApi from '../API/songsApi';
import * as lyricsApi  from '../API/lyricsApi';
import * as util from '../utils';
import Loader from './Loader';
import ErrorHandling from './ErrorHandling';
import styles from './Data.module.css';

class Data extends React.Component {
    state = {
        lyricsAverage: 0,
        lyricsMax: 0,
        lyricsMin: 0,
        lyrics: [],
        isLoading: true,
        err: null
    }
    


    // getData = () => {
    //   songApi.getReleases(this.props.artist)
    //   .then(({ data }) => {
    //     return Promise.allSettled(data.releases.map(song => {
    //       return lyricsApi.getLyrics(this.props.artist, song.title)
    //     }))
    //   })
    //   .then ((res) => {
    //     this.setState({ lyrics: util.formatLyrics(res), isLoading: false})
    //   })
    //   .then(() => {
    //     this.setState({ isLoading: true })
    //     const average = util.getAverage(this.state.lyrics);
    //     const max = util.getMax(this.state.lyrics);
    //     const min = util.getMin(this.state.lyrics);
    //     this.setState({ lyricsAverage: average, lyricsMax: max, lyricsMin: min, isLoading: false})
    //   })
    // }
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
        const { lyricsAverage, lyricsMax, lyricsMin, isLoading, err} = this.state;
        const { handleReset} = this.props;
    return(
        <div className={styles.container}>
            {isLoading ? <Loader /> : 
                <>
                {err === null ? null : (
                  <ErrorHandling msg={err.data.msg} status={err.status}/>
                )}
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

export default Data;