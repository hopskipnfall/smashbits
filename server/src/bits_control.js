import {List} from 'immutable';

export function addBit(state, bit) {
  return state.update('bits', List(), bits => bits.push(bit));
}