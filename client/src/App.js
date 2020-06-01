import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.sass';
import BitPage from './BitPage';
import LoginButton from './LoginButton';
import LoginTransitionPage from './LoginTransitionPage';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <h2>Welcome to SmashBits!</h2>
            <LoginButton />
          </div>
          <p className='App-intro'>
            SmashBits is a place to collaborate on and organize game knowledge
            in a central, public place.
          </p>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/bits/:bitId' component={BitPage} />
          <Route path='/login' component={LoginTransitionPage} />
        </Switch>
      </div>
    );
  }
}

export default App;