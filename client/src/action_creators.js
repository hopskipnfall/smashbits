import { ACTION_ADD_BIT, ACTION_UPVOTE, ACTION_DOWNVOTE, ACTION_RESET_VOTE, ACTION_CHANGE_SORT } from './reducer';

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