import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
