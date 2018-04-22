import { addBit, receiveComments } from './action_creators';
import { jsonToBit } from './bits_util';
import { fromJS } from 'immutable';

const BASE_URI = process.env.NODE_ENV === 'production'
    ? 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev'
    : 'http://localhost:3001';
const BITS_PATH = '/bits';
const COMMENTS_PATH = '/comments';

export function fetchBits(dispatch) {
  // TODO(thenuge): Replace concatenation with a proper URI library.
  // TODO(thenuge): Add actions for initiating requests for bit fetching, as well as errors.
  fetch(BASE_URI + BITS_PATH)
      .then(result => result.json(), error => console.log('Error fetching bits', error))
      .then(response => response.bits.map(bit => dispatch(addBit(jsonToBit(bit)))));
}

export function fetchComments(bitId, dispatch) {
  fetch(BASE_URI + BITS_PATH + '/' + bitId + COMMENTS_PATH)
      .then(result => result.json(), error => console.log('Error fetching comments', error))
      .then(response => dispatch(receiveComments(bitId, fromJS(response))));
}