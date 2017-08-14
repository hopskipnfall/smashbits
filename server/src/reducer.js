import {addBit} from './core';
import {Map, List} from 'immutable';

const INITIAL_STATE = Map();

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_BIT':
      return state.update('bits', List(), bitState => addBit(bitState, action.data));
    default:
      break;
  }
}