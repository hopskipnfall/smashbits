import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.sass';
import BitPage from './BitPage';
import LoginButton from './LoginButton';
import LoginTransitionPage from './LoginTransitionPage';
import Home from './Home';

const App = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome to SmashBits!</h2>
        <LoginButton />
      </div>
      <p className={styles.intro}>
        SmashBits is a place to collaborate on and organize game knowledge
        in a central, public place.
      </p>
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/bits/:bitId" component={BitPage} />
      <Route path="/login" component={LoginTransitionPage} />
    </Switch>
  </div>
);

export default App;
