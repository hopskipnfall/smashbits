import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './reducer';
import { fromJS } from 'immutable';
import { addBit } from './action_creators';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        });
store.dispatch(addBit(foxBit));
store.dispatch(addBit(handBit));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
