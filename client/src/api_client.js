import { addBit, receiveComments, receiveCreateBit } from './action_creators';
import { jsonToBit } from './bits_util';
import { SORT_DATE, SORT_SCORE } from './reducer';
import { fromJS } from 'immutable';
import URI from 'urijs';

const BASE_URI = process.env.NODE_ENV === 'production'
    ? 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev'
    : 'http://localhost:3001';
const BITS_PATH = '/bits';
const COMMENTS_PATH = '/comments';
const CLIENT_SORT_TO_PARAM = { [SORT_DATE]: 'date', [SORT_SCORE]: 'score' };

export function fetchBits(sort, dispatch) {
  // TODO(thenuge): Replace concatenation with a proper URI library.
  // TODO(thenuge): Add actions for initiating requests for bit fetching, as well as errors.
  fetch(new URI(BASE_URI).path(BITS_PATH).query({ sort: CLIENT_SORT_TO_PARAM[sort] }).toString())
      .then(result => result.json(), error => console.log('Error fetching bits', error))
      .then(response => response.bits.map(bit => dispatch(addBit(jsonToBit(bit)))));
}

export function fetchBit(bitId, dispatch) {
  fetch(new URI(BASE_URI).segment([BITS_PATH, bitId]).toString())
      .then(result => result.json(), error => console.log('Error fetching bit: ' + bitId, error))
      .then(response => dispatch(addBit(jsonToBit(response.bit))));
}

export function fetchComments(bitId, dispatch) {
  fetch(new URI(BASE_URI).segment([BITS_PATH, bitId, COMMENTS_PATH]).toString())
      .then(result => result.json(), error => console.log('Error fetching comments', error))
      .then(response => dispatch(receiveComments(bitId, fromJS(response))));
}

export function createBit(bit, dispatch) {
  fetch(new URI(BASE_URI).path(BITS_PATH).toString(),
      {
        body: JSON.stringify({bit: bit}),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
      })
      .then(result => result.headers.get('location'), error => console.log('Error creating bit', error))
      .then(bitUrl => dispatch(receiveCreateBit(bitUrl)));
}