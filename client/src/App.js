import React, { Component } from 'react';
import './App.css';
import {List, fromJS} from 'immutable';
import Bit from './Bit.js'

// TODO(thenuge): Get this from a Redux store.
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
const bits = List.of(foxBit, handBit);

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to SmashBits!</h2>
          </div>
          <p className="App-intro">
            SmashBits is a place to collaborate on and organize game knowledge in a central, public place.
          </p>
        </div>
        <div className="col-md-4" />
        <div className="col-md-8">
          {bits.map(entry => 
            <Bit bit={entry}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
