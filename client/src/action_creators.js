import {
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
} from './reducer';
import { fetchBits as fetchBitsApi, fetchComments as fetchCommentsApi } from './api_client';

export function addBit(bit) {
  return {
    type: ACTION_ADD_BIT,
    data: bit
  }
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
  return {
    type: ACTION_CHANGE_SORT,
    data: sort
  }
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

export function requestComments(bitId) {
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

export function fetchBits() {
  return function(dispatch) {
    return fetchBitsApi(dispatch);
  }
}

export function fetchComments(bitId) {
  return function(dispatch) {
    dispatch(requestComments(bitId));

    return fetchCommentsApi(bitId, dispatch);
  }
}