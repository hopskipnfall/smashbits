// import * as Immutable from 'immutable';
// import { Dispatch } from 'redux';
// import { createBit as createBitApi, fetchBit as fetchBitApi, fetchBits as fetchBitsApi, fetchComments as fetchCommentsApi, fetchProfile as fetchProfileApi } from './api_client';
// import history from './history';
// import { ACTION_ADD_BIT, ACTION_CHANGE_SORT, ACTION_CLEAR_BITS, ACTION_DOWNVOTE, ACTION_RECEIVE_COMMENTS, ACTION_RECEIVE_CREATE_BIT, ACTION_REQUEST_COMMENTS, ACTION_REQUEST_CREATE_BIT, ACTION_RESET_VOTE, ACTION_SET_PROFILE, ACTION_UPVOTE, DEFAULT_PAGE_SIZE } from './reducer';
// import { Bit } from './types';
// import { getOffset, getPageSize, setMainCharsQuery, setOffsetQuery, setPageSizeQuery, setSortQuery, setStagesQuery, setStandaloneTagsQuery, setVsCharsQuery, toggleMainCharQuery, toggleStageQuery, toggleStandaloneTagQuery, toggleVsCharQuery } from './uri_util';

// export function setMainCharFilters(chars: Immutable.Set<string>) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(setMainCharsQuery(chars, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function toggleMainCharFilter(char: string) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(toggleMainCharQuery(char, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function setVsCharFilters(chars: Immutable.Set<string>) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(setVsCharsQuery(chars, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function toggleVsCharFilter(char: string) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(toggleVsCharQuery(char, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function setStageFilters(stages: Immutable.Set<string>) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(setStagesQuery(stages, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function toggleStageFilter(stage: string) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(toggleStageQuery(stage, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function setStandaloneTagFilters(tags: Immutable.Set<string>) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(setStandaloneTagsQuery(tags, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// export function toggleStandaloneTagFilter(tag: string) {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     history.push(toggleStandaloneTagQuery(tag, history.location.search));
//     dispatch(refreshBits());
//   };
// }

// function requestComments(bitId: string) {
//   return {
//     type: ACTION_REQUEST_COMMENTS,
//     data: bitId,
//   };
// }

// export function receiveComments(bitId: string, comments: any) {
//   return {
//     type: ACTION_RECEIVE_COMMENTS,
//     bitId,
//     comments,
//   };
// }

// export function fetchProfileIfNeeded() {
//   return function (dispatch: Dispatch<any>, getState: () => Map<string, any>) {
//     if (!getState().get('profile')) {
//       dispatch(fetchProfile());
//     }
//   };
// }

// export function fetchProfile(successPath?: string) {
//   return (dispatch: Dispatch<any>) => fetchProfileApi(dispatch, successPath);
// }

// export function setProfile(profile: Map<string, any>) {
//   return {
//     type: ACTION_SET_PROFILE,
//     data: profile,
//   };
// }

// export function fetchBit(bitId: string) {
//   return function (dispatch: Dispatch<any>) {
//     dispatch(clearBits());
//     return fetchBitApi(bitId, dispatch);
//   };
// }

// export function fetchComments(bitId: string) {
//   return function (dispatch: Dispatch<any>) {
//     dispatch(requestComments(bitId));

//     fetchCommentsApi(bitId, dispatch);
//   };
// }
