import React, { Component } from 'react';
import './App.css';
import BitsContainer from './BitsContainer';
import SortingMenu from './SortingMenu';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to SmashBits!</h2>
          </div>
          <p className="App-intro">
            SmashBits is a place to collaborate on and organize game knowledge in a central, public place.
          </p>
        </div>
        <div className="col-md-4" />
        <div className="col-md-8">
          <SortingMenu />
          <BitsContainer />
        </div>
      </div>
    );
  }
}

export default App;
