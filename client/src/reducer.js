import { Map, Set, OrderedMap, fromJS } from 'immutable';
import * as filters from 'Shared/filters';

window.fromJS = fromJS;

// TODO(thenuge): Some of these constants should probably go elsewhere.
export const ACTION_CLEAR_BITS = 'ACTION_CLEAR_BITS';
export const ACTION_UPVOTE = 'ACTION_UPVOTE';
export const ACTION_DOWNVOTE = 'ACTION_DOWNVOTE';
export const ACTION_RESET_VOTE = 'ACTION_RESET_VOTE';
export const ACTION_ADD_BIT = 'ACTION_ADD_BIT';
export const ACTION_CHANGE_SORT = 'ACTION_CHANGE_SORT';
export const ACTION_REQUEST_COMMENTS = 'ACTION_REQUEST_COMMENTS';
export const ACTION_RECEIVE_COMMENTS = 'ACTION_RECEIVE_COMMENTS';
export const ACTION_REQUEST_CREATE_BIT = 'ACTION_REQUEST_CREATE_BIT';
export const ACTION_RECEIVE_CREATE_BIT = 'ACTION_RECEIVE_CREATE_BIT';
export const ACTION_SET_OFFSET = 'ACTION_SET_OFFSET';
export const ACTION_SET_PAGE_SIZE = 'ACTION_SET_PAGE_SIZE';

export const USER_UPVOTE = 1;
export const USER_DOWNVOTE = -1;
export const USER_DEFAULT_VOTE = 0;

export const SORT_DATE = 'Date';
export const SORT_SCORE = 'Score';

const DEFAULT_PAGE_SIZE = 25;

const INITIAL_STATE = fromJS({
  bits: OrderedMap(),
  sorting: {
    sorts: [SORT_DATE, SORT_SCORE],
    currentSort: SORT_DATE
  },
  pageSize: DEFAULT_PAGE_SIZE,
  offset: 0,
  filtering: {
    chars: [
        filters.FILTER_CHAR_LUIGI,
        filters.FILTER_CHAR_MARIO,
        filters.FILTER_CHAR_DK,
        filters.FILTER_CHAR_LINK,
        filters.FILTER_CHAR_SAMUS,
        filters.FILTER_CHAR_FALCON,
        filters.FILTER_CHAR_NESS,
        filters.FILTER_CHAR_YOSHI,
        filters.FILTER_CHAR_KIRBY,
        filters.FILTER_CHAR_FOX,
        filters.FILTER_CHAR_PIKA,
        filters.FILTER_CHAR_JIGGLY
    ],
    stages: [
        filters.FILTER_STAGE_PEACH,
        filters.FILTER_STAGE_CONGO,
        filters.FILTER_STAGE_HYRULE,
        filters.FILTER_STAGE_ZEBES,
        filters.FILTER_STAGE_MUSHROOM,
        filters.FILTER_STAGE_DREAMLAND,
        filters.FILTER_STAGE_SECTOR_Z,
        filters.FILTER_STAGE_SAFFRON,
        filters.FILTER_STAGE_META_CRYSTAL,
        filters.FILTER_STAGE_YOSHI_ISLAND_19XX,
        filters.FILTER_STAGE_FINAL_DESTINATION,
        filters.FILTER_STAGE_BATTLEFIELD
    ],
    standaloneTags: [
        filters.FILTER_TAG_APPROACH,
        filters.FILTER_TAG_EDGEGUARDING,
        filters.FILTER_TAG_COMBOS,
        filters.FILTER_TAG_ESCAPES
    ],
  }
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_CLEAR_BITS:
      return clearBits(state);
    case ACTION_ADD_BIT:
      return addBit(state, action.data);
    case ACTION_UPVOTE:
      return state.getIn(['bits', action.data, 'userVote']) === USER_UPVOTE
          ? resetVote(state, action.data)
          : upvote(state, action.data);
    case ACTION_DOWNVOTE:
      return state.getIn(['bits', action.data, 'userVote']) === USER_DOWNVOTE
          ? resetVote(state, action.data)
          : downvote(state, action.data);
    case ACTION_RESET_VOTE:
      return resetVote(state, action.data);
    case ACTION_CHANGE_SORT:
      return changeSort(state, action.data);
    case ACTION_REQUEST_COMMENTS:
      return state.setIn(['bits', action.data, 'isRequestingComments'], true);
    case ACTION_RECEIVE_COMMENTS:
      return receiveComments(state, action.bitId, action.comments);
    case ACTION_REQUEST_CREATE_BIT:
      return state;
    case ACTION_RECEIVE_CREATE_BIT:
      return state;
    case ACTION_SET_OFFSET:
      return state.set('offset', action.data);
    case ACTION_SET_PAGE_SIZE:
      return state.set('pageSize', action.data);
    default:
      return state;
  }
}

const clearBits = (state = Map()) => state.set('bits', OrderedMap());

const addBit = (state = Map(), bit) => state.setIn(['bits', bit.get('postId')], bit);

const upvote = (state = Map(), bitId) =>
    resetVote(state, bitId)
        .setIn(['bits', bitId, 'userVote'], USER_UPVOTE);

const downvote = (state = Map(), bitId) =>
    resetVote(state, bitId)
        .setIn(['bits', bitId, 'userVote'], USER_DOWNVOTE);

const resetVote = (state = Map(), bitId) => state
    .setIn(['bits', bitId, 'userVote'], USER_DEFAULT_VOTE);

const changeSort = (state = Map(), sort) => {
  switch (sort) {
    case SORT_SCORE:
      return state.set('bits',
          state.get('bits', Map()).sortBy(
              bit => -1 * (bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0))))
          .setIn(['sorting', 'currentSort'], sort);
    case SORT_DATE:
      return state.set('bits',
          state.get('bits', Map()).sortBy(
              bit => -1 * bit.get('dateCreated', 0)))
          .setIn(['sorting', 'currentSort'], sort);
    default:
      return state;
  }
};

const receiveComments = (state = Map(), bitId, newComments) =>
    state
        .mergeIn(['comments'], Map(newComments.map(comment => [comment.get('postId'), comment])))
        .updateIn(['bits', bitId, 'comments'], Set(), comments => comments.union(newComments.map(comment => comment.get('postId'))))
        .setIn(['bits', bitId, 'isRequestingComments'], false);
