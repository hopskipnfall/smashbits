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
    ACTION_SET_OFFSET,
    ACTION_SET_PAGE_SIZE,
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

function refreshBits() {
  return function(dispatch, getState) {
    dispatch(clearBits());
    dispatch(fetchBits());
  };
}

export function changeSort(sort) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_CHANGE_SORT,
      data: sort
    });

    // If we have less than 1 page of bits, we can just sort them client-side.
    if (getState().get('bits').size >= getState().get('pageSize')) {
      dispatch(refreshBits());
    }
  };
}

export function setMainCharFilters(chars) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_SET_MAIN_CHAR_FILTERS,
      data: chars
    });

    dispatch(refreshBits());
  };
}

export function toggleMainCharFilter(char) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_TOGGLE_MAIN_CHAR_FILTER,
      data: char
    });

    dispatch(refreshBits());
  };
}

export function setVsCharFilters(chars) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_SET_VS_CHAR_FILTERS,
      data: chars
    });

    dispatch(refreshBits());
  };
}

export function toggleVsCharFilter(char) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_TOGGLE_VS_CHAR_FILTER,
      data: char
    });

    dispatch(refreshBits());
  };
}

export function setStageFilters(stages) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_SET_STAGE_FILTERS,
      data: stages
    });

    dispatch(refreshBits());
  };
}

export function toggleStageFilter(stage) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_TOGGLE_STAGE_FILTER,
      data: stage
    });

    dispatch(refreshBits());
  };
}

export function setStandaloneTagFilters(tags) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_SET_STANDALONE_TAG_FILTERS,
      data: tags
    });

    dispatch(refreshBits());
  };
}

export function toggleStandaloneTagFilter(tag) {
  return function(dispatch, getState) {
    dispatch({
      type: ACTION_TOGGLE_STANDALONE_TAG_FILTER,
      data: tag
    });

    dispatch(refreshBits());
  };
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
    dispatch(clearBits());
    return fetchBitApi(bitId, dispatch);
  }
}

export function fetchBits({ sort, offset, limit, mainChars, vsChars, stages, standaloneTags } = {}) {
  return function(dispatch, getState) {
    return fetchBitsApi({
      sort: sort || getState().getIn(['sorting', 'currentSort']),
      offset: offset || getState().get('offset'),
      pageSize: limit || getState().get('pageSize'),
      mainChars: mainChars || getState().getIn(['filtering', 'currentMainChars']),
      vsChars: vsChars || getState().getIn(['filtering', 'currentVsChars']),
      stages: stages || getState().getIn(['filtering', 'currentStages']),
      standaloneTags: standaloneTags || getState().getIn(['filtering', 'currentStandaloneTags']),
      dispatch: dispatch
    });
  }
}

export function fetchNextPage() {
  return function(dispatch, getState) {
    var offset = getState().get('offset') + getState().get('pageSize');
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function fetchPreviousPage() {
  return function(dispatch, getState) {
    var offset = Math.max(0, getState().get('offset') - getState().get('pageSize'));
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function setOffset(offset) {
  return {
    type: ACTION_SET_OFFSET,
    data: offset
  }
}

export function setPageSize(pageSize) {
  return function(dispatch) {
    dispatch({
      type: ACTION_SET_PAGE_SIZE,
      data: pageSize
    });
    dispatch(setOffset(0));
    dispatch(refreshBits());
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