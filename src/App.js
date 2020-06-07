import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      timestamp: '',
      iss_position: {
        latitude: '',
        longitude: ''
      }
    }
  }

  componentDidMount() {
    fetch('http://api.open-notify.org/iss-now.json')
      .then(response => response.json())
      .then(loc => this.setState({
        message: loc.message,
        timestamp: loc.timestamp,
        iss_position: {
          latitude: loc.iss_position.latitude,
          longitude: loc.iss_position.longitude
        }
      }));
  }

  goToMapLoc = () => {
    window.location = `https://www.google.com/maps/search/?api=1&query=${this.state.iss_position.latitude}
      ,${this.state.iss_position.longitude}`;
  }

  render() {
    const { iss_position } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Where is the International Space Station?</h1>
          <p>This app simply grabs the latitude and longitude of the ISS and 
            you can then go to its Google Map location.</p>
          <h2>Latitude: {iss_position.latitude}</h2>
          <h2>Longitude: {iss_position.longitude}</h2>
          <button onClick={this.goToMapLoc}>Google Map Location</button>
        </header>
      </div>
    );
  }
}

export default App;
