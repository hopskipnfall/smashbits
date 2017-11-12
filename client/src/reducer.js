import { Map, fromJS } from 'immutable';

// TODO(thenuge): Some of these constants should probably go elsewhere.
export const ACTION_UPVOTE = Symbol('ACTION_UPVOTE');
export const ACTION_DOWNVOTE = Symbol('ACTION_DOWNVOTE');
export const ACTION_RESET_VOTE = Symbol('ACTION_RESET_VOTE');
export const ACTION_ADD_BIT = Symbol('ACTION_ADD_BIT');
export const ACTION_CHANGE_SORT = Symbol('ACTION_CHANGE_SORT');

export const USER_UPVOTE = 1;
export const USER_DOWNVOTE = -1;
export const USER_DEFAULT_VOTE = 0;

export const SORT_DATE = Symbol.for('Date');
export const SORT_SCORE = Symbol.for('Score');

const INITIAL_STATE = fromJS({
  sorting: {
    sorts: [SORT_DATE, SORT_SCORE],
    currentSort: SORT_SCORE
  }
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

const addBit = (state = Map(), bit) => state.setIn(['bits', bit.get('id')], bit);

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
              bit => -1 * bit.get('date_created', 0).getTime()))
          .setIn(['sorting', 'currentSort'], sort);
    default:
      return state;
  }
}