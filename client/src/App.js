import React, { Component } from 'react';
import './App.css';
import BitPage from './BitPage';
import Home from './Home';
import { Route, Switch } from "react-router-dom";

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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/bits/:bitId' component={BitPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
