import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { BrowserRouter as Router } from "react-router-dom";
import history from "./history";
// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
import $ from 'jquery';
window.jQuery = window.$ = $;
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
