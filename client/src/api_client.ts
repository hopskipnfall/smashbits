import * as URI from 'urijs';
import { addBit, receiveComments, receiveCreateBit, setProfile } from './action_creators';
import * as fakeClient from './fake_api_client';
import history from './history';
import { Bit } from './types';
import { Dispatch } from 'redux';
import { fromJS } from 'immutable';
import * as Immutable from 'immutable';

// TODO: Fix this "any" type.
function safeFetch(url: string, options?: any) {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
}

const BASE_URI = process.env.NODE_ENV === 'production'
  ? 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev'
  : 'http://localhost:3001';
const BITS_PATH = '/bits';
const COMMENTS_PATH = '/comments';
const OAUTH_PATH = '/login';
const TWITTER_PATH = '/twitter';
const PROFILE_PATH = '/profile';
// Set this to true in .env to use local, fake data instead of making any RPCs.
const USE_FAKE_CLIENT = (process.env.USE_FAKE_API_CLIENT === 'true') && process.env.NODE_ENV === 'development';

export function fetchBits(): Promise<{bits: Bit[]}> {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchBits();
  } else {
    fetchPromise = safeFetch(
      new URI(BASE_URI)
        .path(BITS_PATH)
        .query(history.location.search)
        .toString())
      .then(result => result.json())
      .catch(error => {
        console.error('Error fetching bits', error);
        // TODO(thenuge): Handle this more gracefully with a message in the UI.
        throw error;
      });
  }
  return fetchPromise;
  // TODO(thenuge): Add actions for initiating requests for bit fetching, as well as errors.
  // fetchPromise.then((response: any) => response.bits.map((bit: { [key: string]: any }) => dispatch(addBit(new Bit(bit)))));
}

export function fetchBit(bitId: string, dispatch: Function) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchBit(bitId);
  } else {
    fetchPromise = safeFetch(
      new URI(BASE_URI).segment([BITS_PATH, bitId]).toString(),
    )
      .then(result => result.json())
      .catch(error => {
        console.log(`Error fetching bit: ${bitId}`, error);
        // TODO(thenuge): Handle this more gracefully with a message in the UI.
        throw error;
      });
  }
  fetchPromise.then(response => dispatch(addBit(response.bit)));
}

export function fetchComments(bitId: string, dispatch: Function) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchComments(bitId);
  } else {
    fetchPromise = safeFetch(
      new URI(BASE_URI).segment([BITS_PATH, bitId, COMMENTS_PATH]).toString(),
    )
      .then(result => result.json())
      .catch(error => {
        console.log('Error fetching comments', error);
        // TODO(thenuge): Handle this more gracefully with a message in the UI.
        throw error;
      });
  }
  fetchPromise.then(response => dispatch(receiveComments(bitId, fromJS(response))));
}

export function createBit(bit: Bit, dispatch: Dispatch) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.createBit(bit);
  } else {
    fetchPromise = safeFetch(new URI(BASE_URI).path(BITS_PATH).toString(), {
      body: JSON.stringify({ bit }),
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
  return fetchPromise;
  // fetchPromise.then(bitUrl => dispatch(receiveCreateBit(bitUrl)));
}

export function initTwitterLogin() {
  if (USE_FAKE_CLIENT) {
    history.push('/login?success=true');
  } else {
    window.location.href = new URI(BASE_URI)
      .path(OAUTH_PATH + TWITTER_PATH)
      .toString();
  }
}

export function fetchProfile(dispatch: Function, successPath?: string) {
  let fetchPromise;
  if (USE_FAKE_CLIENT) {
    fetchPromise = fakeClient.fetchProfile();
  } else {
    fetchPromise = safeFetch(
      new URI(BASE_URI)
        .path(PROFILE_PATH)
        .toString(),
    )
      .then(result => result.json())
      .catch(error => {
        console.log('Error fetching profile', error);
        // TODO(thenuge): Handle this more gracefully with a message in the UI.
        throw error;
      });
  }
  // TODO(thenuge): Handle errors.
  fetchPromise.then(response => dispatch(setProfile(fromJS(response.user))));
  if (successPath) {
    history.push(successPath);
  }
}
