import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer, { SORT_SCORE } from './reducer';
import { Set, fromJS } from 'immutable';
import { addBit, changeSort } from './action_creators';
// Hack to ensure jQuery is registered before bootstrap.
// See https://stackoverflow.com/questions/34120250/error-using-bootstrap-jquery-packages-in-es6-with-browserify.
// TODO(thenuge): Probably just use Sass instead.
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

const store = createStore(reducer);

// TODO(thenuge): Remove these; they're just for testing.
const foxBit = fromJS({
    id: 'L3WDO8EL3LEKS',
    author: {
      person_id: 'I2L3KFAE9GLREJ3',
      name: 'Shears',
    },
    date_created: new Date(2017, 5, 1, 12, 12),
    upvotes: 10,
    downvotes: 3,
    title: 'Fox is unedgeguardable',
    content: 'No matter what you do, you\'ll never be able to kill a recovering Fox.',
    mainChars: Set([Symbol.for('Fox')]),
    standaloneTags: Set([Symbol.for('Edgeguarding')]),
});
const handBit = fromJS({
    id: 'ME8DU23MNO0S',
    author: {
      person_id: '562B3409SLL',
      name: 'JonnJonn',
    },
    date_created: new Date(1993, 6, 24),
    upvotes: 42,
    downvotes: 8,
    title: 'Master Hand\'s getup attack',
    content: 'It\'s a 1HKO.',
    stages: Set([Symbol.for('Dream Land'), Symbol.for('Congo Jungle')]),
    standaloneTags: Set([Symbol.for('Approach')]),
});
const falconPressureBit = fromJS({
    id: 'JNHQ98ASKJAK',
    author: {
      person_id: '82JS0NG28XL1',
      name: 'LowwwPower',
    },
    date_created: new Date(2010, 8, 12, 6, 17, 53),
    upvotes: 53,
    downvotes: 21,
    title: 'Falcon shield pressure against Yoshi',
    content: 'A way to pressure Yoshis that love baiting platform push off by holding shield, especially when you are respawning and have invincibility. Even if you don\'t get the break, they often times get hit trying to escape which can lead to a bunch of combo starters.',
    mainChars: Set([Symbol.for('Captain Falcon')]),
    vsChars: Set([Symbol.for('Yoshi')]),
});
store.dispatch(addBit(foxBit));
store.dispatch(addBit(handBit));
store.dispatch(addBit(falconPressureBit));
store.dispatch(changeSort(SORT_SCORE));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
