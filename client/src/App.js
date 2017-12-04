import React, { Component } from 'react';
import './App.css';
import BitsContainer from './BitsContainer';
import SortingMenu from './SortingMenu';
import FilterControl from './FilterControl';
import { Col } from 'react-bootstrap'

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
        <Col md={4}>
          <FilterControl />
        </Col>
        <Col md={8}>
          <SortingMenu />
          <BitsContainer />
        </Col>
      </div>
    );
  }
}

export default App;
