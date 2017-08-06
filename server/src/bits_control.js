import {List} from 'immutable';

export function addBit(state, bit) {
  return state.updateIn(
    ['bits'],
    List(),
    bits => bits.push(bit)
   );
}