// import * as Immutable from 'immutable';
// import { Dispatch } from 'redux';
// import { createBit as createBitApi, fetchBit as fetchBitApi, fetchBits as fetchBitsApi, fetchComments as fetchCommentsApi, fetchProfile as fetchProfileApi } from './api_client';
// import history from './history';
// import { ACTION_ADD_BIT, ACTION_CHANGE_SORT, ACTION_CLEAR_BITS, ACTION_DOWNVOTE, ACTION_RECEIVE_COMMENTS, ACTION_RECEIVE_CREATE_BIT, ACTION_REQUEST_COMMENTS, ACTION_REQUEST_CREATE_BIT, ACTION_RESET_VOTE, ACTION_SET_PROFILE, ACTION_UPVOTE, DEFAULT_PAGE_SIZE } from './reducer';
// import { Bit } from './types';
// import { getOffset, getPageSize, setMainCharsQuery, setOffsetQuery, setPageSizeQuery, setSortQuery, setStagesQuery, setStandaloneTagsQuery, setVsCharsQuery, toggleMainCharQuery, toggleStageQuery, toggleStandaloneTagQuery, toggleVsCharQuery } from './uri_util';

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

// export function fetchComments(bitId: string) {
//   return function (dispatch: Dispatch<any>) {
//     dispatch(requestComments(bitId));

//     fetchCommentsApi(bitId, dispatch);
//   };
// }
