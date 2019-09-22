import { addBit, receiveComments, receiveCreateBit } from './action_creators';
import { SORT_DATE, SORT_SCORE } from './reducer';
import * as fakeClient from './fake_api_client';
import * as query from 'Shared/query_params';
import { getCharFilterQuery, getStageFilterQuery, getTagFilterQuery } from 'Shared/query_util';
import { fromJS } from 'immutable';
import URI from 'urijs';

const BASE_URI = process.env.NODE_ENV === 'production'
    ? 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev'
    : 'http://localhost:3001';
const BITS_PATH = '/bits';
const COMMENTS_PATH = '/comments';
const CLIENT_SORT_TO_PARAM = { [SORT_DATE]: query.SORT_PARAM_DATE, [SORT_SCORE]: query.SORT_PARAM_DATE };
// Set this to true in development to use local, fake data instead of making any RPCs.
const USE_FAKE_CLIENT = false && process.env.NODE_ENV === 'development';

export function fetchBits({sort, offset, pageSize, mainChars, vsChars, stages, standaloneTags, dispatch}) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchBits();
  } else {
    fetchPromise =
        fetch(new URI(BASE_URI)
            .path(BITS_PATH)
            // TODO(thenuge): The query logic can be replaced with the URL querystring once we've migrated each param over.
            .query({
                ...sort && { [query.QUERY_SORT]: CLIENT_SORT_TO_PARAM[sort] },
                ...offset && { [query.QUERY_OFFSET]: offset },
                ...pageSize && { [query.QUERY_LIMIT]: pageSize },
                ...mainChars && { [query.QUERY_MAIN_CHARS]: getCharFilterQuery(mainChars) },
                ...vsChars && { [query.QUERY_VS_CHARS]: getCharFilterQuery(vsChars) },
                ...stages && { [query.QUERY_STAGES]: getStageFilterQuery(stages) },
                ...standaloneTags && { [query.QUERY_TAGS]: getTagFilterQuery(standaloneTags) },
              })
            .toString())
        .then(result => result.json())
        .catch(error => {
          console.log('Error fetching bits', error);
          // TODO(thenuge): Handle this more gracefully with a message in the UI.
          throw error;
        });
  }
  // TODO(thenuge): Add actions for initiating requests for bit fetching, as well as errors.
  fetchPromise
      .then(response => response.bits.map(bit => dispatch(addBit(fromJS(bit)))));
}

export function fetchBit(bitId, dispatch) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchBit(bitId);
  } else {
    fetchPromise = fetch(new URI(BASE_URI).segment([BITS_PATH, bitId]).toString())
        .then(result => result.json())
        .catch(error => {
          console.log('Error fetching bit: ' + bitId, error);
          // TODO(thenuge): Handle this more gracefully with a message in the UI.
          throw error;
        });
  }
  fetchPromise
      .then(response => dispatch(addBit(fromJS(response.bit))));
}

export function fetchComments(bitId, dispatch) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchComments(bitId);
  } else {
    fetchPromise = fetch(new URI(BASE_URI).segment([BITS_PATH, bitId, COMMENTS_PATH]).toString())
        .then(result => result.json())
        .catch(error => {
          console.log('Error fetching comments', error);
          // TODO(thenuge): Handle this more gracefully with a message in the UI.
          throw error;
        });
  }
  fetchPromise
      .then(response => dispatch(receiveComments(bitId, fromJS(response))));
}

export function createBit(bit, dispatch) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.createBit(bit);
  } else {
    fetchPromise =
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
        .then(result => result.headers.get('location'))
        .catch(error => {
          console.log('Error creating bit', error);
          // TODO(thenuge): Handle this more gracefully with a message in the UI.
          throw error;
        });
  }
  fetchPromise
      .then(bitUrl => dispatch(receiveCreateBit(bitUrl)));
}