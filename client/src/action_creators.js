import {
    ACTION_CLEAR_BITS,
    ACTION_ADD_BIT,
    ACTION_UPVOTE,
    ACTION_DOWNVOTE,
    ACTION_RESET_VOTE,
    ACTION_CHANGE_SORT,
    ACTION_TOGGLE_MAIN_CHAR_FILTER,
    ACTION_TOGGLE_VS_CHAR_FILTER,
    ACTION_TOGGLE_STAGE_FILTER,
    ACTION_TOGGLE_STANDALONE_TAG_FILTER,
    ACTION_SET_MAIN_CHAR_FILTERS,
    ACTION_SET_VS_CHAR_FILTERS,
    ACTION_SET_STAGE_FILTERS,
    ACTION_SET_STANDALONE_TAG_FILTERS,
    ACTION_REQUEST_COMMENTS,
    ACTION_RECEIVE_COMMENTS,
    ACTION_REQUEST_CREATE_BIT,
    ACTION_RECEIVE_CREATE_BIT,
    SORT_DATE,
} from './reducer';
import { fetchBit as fetchBitApi, fetchBits as fetchBitsApi, fetchComments as fetchCommentsApi, createBit as createBitApi } from './api_client';

export function clearBits() {
  return {
    type: ACTION_CLEAR_BITS
  };
}

export function addBit(bit) {
  return {
    type: ACTION_ADD_BIT,
    data: bit
  };
}

export function upvote(bitId) {
  return {
    type: ACTION_UPVOTE,
    data: bitId
  };
}

export function downvote(bitId) {
  return {
    type: ACTION_DOWNVOTE,
    data: bitId
  };
}

export function resetVote(bitId) {
  return {
    type: ACTION_RESET_VOTE,
    data: bitId
  };
}

export function changeSort(sort) {
  return function(dispatch) {
    dispatch({
      type: ACTION_CHANGE_SORT,
      data: sort
    });
    dispatch(clearBits());
    return dispatch(fetchBits(sort, dispatch));
  };
}

export function setMainCharFilters(chars) {
  return {
    type: ACTION_SET_MAIN_CHAR_FILTERS,
    data: chars
  }
}

export function toggleMainCharFilter(char) {
  return {
    type: ACTION_TOGGLE_MAIN_CHAR_FILTER,
    data: char
  }
}

export function setVsCharFilters(chars) {
  return {
    type: ACTION_SET_VS_CHAR_FILTERS,
    data: chars
  }
}

export function toggleVsCharFilter(char) {
  return {
    type: ACTION_TOGGLE_VS_CHAR_FILTER,
    data: char
  }
}

export function setStageFilters(stages) {
  return {
    type: ACTION_SET_STAGE_FILTERS,
    data: stages
  }
}

export function toggleStageFilter(stage) {
  return {
    type: ACTION_TOGGLE_STAGE_FILTER,
    data: stage
  }
}

export function setStandaloneTagFilters(tags) {
  return {
    type: ACTION_SET_STANDALONE_TAG_FILTERS,
    data: tags
  }
}

export function toggleStandaloneTagFilter(tag) {
  return {
    type: ACTION_TOGGLE_STANDALONE_TAG_FILTER,
    data: tag
  }
}

function requestComments(bitId) {
  return {
    type: ACTION_REQUEST_COMMENTS,
    data: bitId
  }
}

export function receiveComments(bitId, comments) {
  return {
    type: ACTION_RECEIVE_COMMENTS,
    bitId: bitId,
    comments: comments
  }
}

export function fetchBit(bitId) {
  return function(dispatch) {
    return fetchBitApi(bitId, dispatch);
  }
}

export function fetchBits(sort = SORT_DATE) {
  return function(dispatch) {
    return fetchBitsApi(sort, dispatch);
  }
}

export function fetchComments(bitId) {
  return function(dispatch) {
    dispatch(requestComments(bitId));

    return fetchCommentsApi(bitId, dispatch);
  }
}

function requestCreateBit(bit) {
  return {
    type: ACTION_REQUEST_CREATE_BIT,
    data: bit
  }
}

export function receiveCreateBit(bitUrl) {
  return {
    type: ACTION_RECEIVE_CREATE_BIT,
    data: bitUrl
  }
}

export function createBit(bit) {
  return function(dispatch) {
    dispatch(requestCreateBit(bit));
    return createBitApi(bit, dispatch);
  }
}