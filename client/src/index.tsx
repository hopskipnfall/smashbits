import * as $ from 'jquery';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store';

// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}
window.jQuery = window.$ = $;
require('bootstrap');

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
