import {
    ACTION_CLEAR_BITS,
    ACTION_ADD_BIT,
    ACTION_UPVOTE,
    ACTION_DOWNVOTE,
    ACTION_RESET_VOTE,
    ACTION_CHANGE_SORT,
    ACTION_REQUEST_COMMENTS,
    ACTION_RECEIVE_COMMENTS,
    ACTION_REQUEST_CREATE_BIT,
    ACTION_RECEIVE_CREATE_BIT,
    DEFAULT_PAGE_SIZE,
} from './reducer';
import { fetchBit as fetchBitApi, fetchBits as fetchBitsApi, fetchComments as fetchCommentsApi, createBit as createBitApi } from './api_client';
import history from './history';
import {
  getOffset,
  getPageSize,
  setMainCharsQuery,
  toggleMainCharQuery,
  setVsCharsQuery,
  toggleVsCharQuery,
  setStagesQuery,
  toggleStageQuery,
  setStandaloneTagsQuery,
  toggleStandaloneTagQuery,
  setSortQuery,
  setOffsetQuery,
  setPageSizeQuery,
} from './uri_util';

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
    history.push(setSortQuery(sort, history.location.search));

    // If we have less than 1 page of bits, we can just sort them client-side.
    if (getState().get('bits').size >= getState().get('pageSize')) {
      dispatch(refreshBits());
    } else {
      dispatch({
        type: ACTION_CHANGE_SORT,
        data: sort
      });
    }
  };
}

export function setMainCharFilters(chars) {
  return function(dispatch, getState) {
    history.push(setMainCharsQuery(chars, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleMainCharFilter(char) {
  return function(dispatch, getState) {
    history.push(toggleMainCharQuery(char, history.location.search));
    dispatch(refreshBits());
  };
}

export function setVsCharFilters(chars) {
  return function(dispatch, getState) {
    history.push(setVsCharsQuery(chars, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleVsCharFilter(char) {
  return function(dispatch, getState) {
    history.push(toggleVsCharQuery(char, history.location.search));
    dispatch(refreshBits());
  };
}

export function setStageFilters(stages) {
  return function(dispatch, getState) {
    history.push(setStagesQuery(stages, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleStageFilter(stage) {
  return function(dispatch, getState) {
    history.push(toggleStageQuery(stage, history.location.search));
    dispatch(refreshBits());
  };
}

export function setStandaloneTagFilters(tags) {
  return function(dispatch, getState) {
    history.push(setStandaloneTagsQuery(tags, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleStandaloneTagFilter(tag) {
  return function(dispatch, getState) {
    history.push(toggleStandaloneTagQuery(tag, history.location.search));
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

export function fetchBits() {
  return function(dispatch, getState) {
    return fetchBitsApi(dispatch);
  }
}

export function fetchNextPage() {
  return function(dispatch, getState) {
    const offset = (getOffset(history.location.search) || 0)
        + (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE);
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function fetchPreviousPage() {
  return function(dispatch, getState) {
    const offset = Math.max(
        0,
        (getOffset(history.location.search) || 0)
          - (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE));
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function setOffset(offset) {
  return function(dispatch, getState) {
    history.push(setOffsetQuery(offset, history.location.search));
  }
}

export function setPageSize(pageSize) {
  return function(dispatch) {
    history.push(setPageSizeQuery(pageSize, setOffsetQuery(0, history.location.search)));
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