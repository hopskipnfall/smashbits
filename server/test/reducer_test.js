import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer logic: ', () => {
  describe('add bit', () => {
    it('adds a bit to an empty initial state', () => {
      const bit = fromJS({
        id: 'L3WDO8EL3LEKS',
        author: {
          person_id: 'I2L3KFAE9GLREJ3',
        },
        date_created: new Date(2017, 5, 1, 12, 12),
        upvotes: 10,
        downvotes: 3,
        title: 'Fox is unedgeguardable',
        content: 'No matter what you do, you\'ll never be able to kill a recovering Fox.',
      });
      const action = {type: 'ADD_BIT', data: bit};
      const newState = reducer(undefined, action);
      expect(newState).to.equal(fromJS({bits: [bit]}));
    });

    it('adds a bit to a state with existing bits', () => {
      const initialBit = fromJS({
          id: 'ME8DU23MNO0S',
          author: {
            person_id: '562B3409SLL',
          },
          date_created: new Date(1993, 6, 24),
          upvotes: 42,
          downvotes: 8,
          title: 'Master Hand\'s getup attack',
          content: 'It\'s a 1HKO.',
        });

      const initialState = fromJS({
        bits: [initialBit],
      });

      const newBit = fromJS({
        id: 'L3WDO8EL3LEKS',
        author: {
          person_id: 'I2L3KFAE9GLREJ3',
        },
        date_created: new Date(2017, 5, 1, 12, 12),
        upvotes: 10,
        downvotes: 3,
        title: 'Fox is unedgeguardable',
        content: 'No matter what you do, you\'ll never be able to kill a recovering Fox.',
      });
      const action = {type: 'ADD_BIT', data: newBit};
      const newState = reducer(initialState, action);
      expect(newState).to.equal(fromJS({bits: [initialBit, newBit]}));
    });
  });
});