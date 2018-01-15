import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer, { SORT_SCORE } from './reducer';
import { jsonToBit } from './bits_util';
import { addBit, changeSort } from './action_creators';
// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

const store = createStore(reducer);

let uri = 'http://localhost:3001/bits';
if (process.env.NODE_ENV === 'production') {
  uri = 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev';
}
fetch(uri)
    .then(result => result.json())
    .then(response => response.bits.map(bit => store.dispatch(addBit(jsonToBit(bit)))));
store.dispatch(changeSort(SORT_SCORE));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
