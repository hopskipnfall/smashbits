import { addBit } from './action_creators';
import { jsonToBit } from './bits_util';

export function initializeBits(store) {
  let uri = 'http://localhost:3001/bits';
  if (process.env.NODE_ENV === 'production') {
    uri = 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev';
  }
  fetch(uri)
      .then(result => result.json())
      .then(response => response.bits.map(bit => store.dispatch(addBit(jsonToBit(bit)))));
}