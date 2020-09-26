import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as styles from './App.sass';
import BitPage from './BitPage';
import Home from './Home';
import LoginButton from './LoginButton';

const App = () => (
  <div>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome to SmashBits!</h2>
        <LoginButton />
      </div>
      <p className={styles.intro}>
        SmashBits is a place to collaborate on and organize game knowledge in a central, public place.
      </p>
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/bits/:bitId" component={BitPage} />
    </Switch>
  </div>
);

export default App;
