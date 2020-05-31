import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styles from './App.sass';
import BitPage from './BitPage';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Welcome to SmashBits!</h2>
            <a href='http://localhost:3001/login/twitter'>
              <Button>Log in with Twitter</Button>
            </a>
          </div>
          <p className={styles.intro}>
            SmashBits is a place to collaborate on and organize game knowledge
            in a central, public place.
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
