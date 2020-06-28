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
  ACTION_SET_PROFILE,
  DEFAULT_PAGE_SIZE,
} from './reducer';
import {
  fetchBit as fetchBitApi,
  fetchBits as fetchBitsApi,
  fetchComments as fetchCommentsApi,
  createBit as createBitApi,
  fetchProfile as fetchProfileApi,
} from './api_client';
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
import { Dispatch } from 'redux';
import { Bit } from './types';

export function clearBits() {
  return {
    type: ACTION_CLEAR_BITS,
  };
}

export function addBit(bit: Map<string, any>) {
  return {
    type: ACTION_ADD_BIT,
    data: bit,
  };
}

export function upvote(bitId: string) {
  return {
    type: ACTION_UPVOTE,
    data: bitId,
  };
}

export function downvote(bitId: string) {
  return {
    type: ACTION_DOWNVOTE,
    data: bitId,
  };
}

export function resetVote(bitId: string) {
  return {
    type: ACTION_RESET_VOTE,
    data: bitId,
  };
}

function refreshBits() {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    dispatch(clearBits());
    dispatch(fetchBits());
  };
}

export function changeSort(sort: string) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setSortQuery(sort, history.location.search));

    // If we have less than 1 page of bits, we can just sort them client-side.
    if (getState().get('bits').size >= getState().get('pageSize')) {
      dispatch(refreshBits());
    } else {
      dispatch({
        type: ACTION_CHANGE_SORT,
        data: sort,
      });
    }
  };
}

export function setMainCharFilters(chars: string[]) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setMainCharsQuery(chars, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleMainCharFilter(char: string) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(toggleMainCharQuery(char, history.location.search));
    dispatch(refreshBits());
  };
}

export function setVsCharFilters(chars: string[]) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setVsCharsQuery(chars, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleVsCharFilter(char: string) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(toggleVsCharQuery(char, history.location.search));
    dispatch(refreshBits());
  };
}

export function setStageFilters(stages: string[]) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setStagesQuery(stages, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleStageFilter(stage: string) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(toggleStageQuery(stage, history.location.search));
    dispatch(refreshBits());
  };
}

export function setStandaloneTagFilters(tags: string[]) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setStandaloneTagsQuery(tags, history.location.search));
    dispatch(refreshBits());
  };
}

export function toggleStandaloneTagFilter(tag: string) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(toggleStandaloneTagQuery(tag, history.location.search));
    dispatch(refreshBits());
  };
}

function requestComments(bitId: string) {
  return {
    type: ACTION_REQUEST_COMMENTS,
    data: bitId,
  };
}

export function receiveComments(bitId: string, comments: any) {
  return {
    type: ACTION_RECEIVE_COMMENTS,
    bitId,
    comments,
  };
}

export function fetchProfileIfNeeded() {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    if (!getState().get('profile')) {
      dispatch(fetchProfile());
    }
  };
}

export function fetchProfile(successPath?: string) {
  return (dispatch: Dispatch<any>) => fetchProfileApi(dispatch, successPath);
}

export function setProfile(profile: Map<string, any>) {
  return {
    type: ACTION_SET_PROFILE,
    data: profile,
  };
}

export function fetchBit(bitId: string) {
  return function (dispatch: Dispatch<any>) {
    dispatch(clearBits());
    return fetchBitApi(bitId, dispatch);
  };
}

export function fetchBits() {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    return fetchBitsApi(dispatch);
  };
}

export function fetchNextPage() {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    const offset = (getOffset(history.location.search) || 0)
        + (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE);
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function fetchPreviousPage() {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    const offset = Math.max(
      0,
      (getOffset(history.location.search) || 0)
          - (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE),
    );
    dispatch(setOffset(offset));
    dispatch(refreshBits());
  };
}

export function setOffset(offset: number) {
  return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
    history.push(setOffsetQuery(offset, history.location.search));
  };
}

export function setPageSize(pageSize: number) {
  return function (dispatch: Dispatch<any>) {
    history.push(setPageSizeQuery(pageSize, setOffsetQuery(0, history.location.search)));
    dispatch(refreshBits());
  };
}

export function fetchComments(bitId: string) {
  return function (dispatch: Dispatch<any>) {
    dispatch(requestComments(bitId));

    fetchCommentsApi(bitId, dispatch);
  };
}

function requestCreateBit(bit: Bit) {
  return {
    type: ACTION_REQUEST_CREATE_BIT,
    data: bit,
  };
}

export function receiveCreateBit(bitUrl: string | null) {
  return {
    type: ACTION_RECEIVE_CREATE_BIT,
    data: bitUrl,
  };
}

export function createBit(bit: Bit) {
  return function (dispatch: Dispatch<any>) {
    dispatch(requestCreateBit(bit));
    return createBitApi(bit, dispatch);
  };
}
