import { Map } from 'immutable';

export const ACTION_UPVOTE = Symbol('ACTION_UPVOTE');
export const ACTION_DOWNVOTE = Symbol('ACTION_DOWNVOTE');
export const ACTION_RESET_VOTE = Symbol('ACTION_RESET_VOTE');
export const ACTION_ADD_BIT = Symbol('ACTION_ADD_BIT');

export const USER_UPVOTE = Symbol('USER_UPVOTE');
export const USER_DOWNVOTE = Symbol('USER_DOWNVOTE');
export const USER_DEFAULT_VOTE = Symbol('USER_DEFAULT_VOTE');

export default function(state = Map(), action) {
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
    default:
      return state;
  }
}

const addBit = (state = Map(), bit) => state.setIn(['bits', bit.get('id')], bit);

const upvote = (state = Map(), bitId) => 
    resetVote(state, bitId)
        .updateIn(['bits', bitId, 'upvotes'], 0, count => count + 1)
        .setIn(['bits', bitId, 'userVote'], USER_UPVOTE);

const downvote = (state = Map(), bitId) => 
    resetVote(state, bitId)
        .updateIn(['bits', bitId, 'downvotes'], 0, count => count + 1)
        .setIn(['bits', bitId, 'userVote'], USER_DOWNVOTE);

const resetVote = (state = Map(), bitId) => state
    .updateIn(['bits', bitId, 'upvotes'], 
        0, 
        count => state.getIn(['bits', bitId, 'userVote']) === USER_UPVOTE 
            ? count - 1 
            : count)
    .updateIn(['bits', bitId, 'downvotes'],
        0, 
        count => state.getIn(['bits', bitId, 'userVote']) === USER_DOWNVOTE 
            ? count - 1 
            : count)
    .setIn(['bits', bitId, 'userVote'], USER_DEFAULT_VOTE);