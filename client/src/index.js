import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer, { SORT_SCORE } from './reducer';
import { initializeBits } from './api_client';
import { changeSort } from './action_creators';
// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

const store = createStore(reducer);

initializeBits(store);
store.dispatch(changeSort(SORT_SCORE));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
