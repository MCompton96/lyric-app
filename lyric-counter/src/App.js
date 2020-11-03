import styles from './App.module.css';
import React from 'react';
import Data from './components/Data';
import Header from './components/Header';


class App extends React.Component {
  
  state = {
    artist: 'coldplay',
    secondArtist: 'coldplay',
    isSubmitted: false,
    showCompare: false
  }  

  handleChange = (event, artist) => {
    const value = event.target.value;
    this.setState({ artist: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitted: true})
  }

  handleReset = () => {
    this.setState({ artist: 'coldplay', isSubmitted: false})
  }

  handleCompare = (event) => {
    event.preventDefault()
    this.setState({ showCompare: true })
  }

  render() {
    const { isSubmitted, artist} = this.state;
    
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <label>
              <span className={styles.label}>Artist Name:&nbsp;</span>
              <input onChange={this.handleChange} className={styles.input}/>
              <button className={styles.button}>Submit</button>
            </label>
          </form>
        </div>
    {isSubmitted ? <Data artist={artist} handleReset={this.handleReset}/> : null}
      </div>
    )
  }
  
}

export default App;
