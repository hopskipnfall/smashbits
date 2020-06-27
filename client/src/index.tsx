// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
import * as $ from 'jquery';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import history from './history';
import './index.sass';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

window.jQuery = window.$ = $;
require('bootstrap');

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
