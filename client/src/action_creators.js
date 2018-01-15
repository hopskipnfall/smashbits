import {
    ACTION_ADD_BIT,
    ACTION_UPVOTE,
    ACTION_DOWNVOTE,
    ACTION_RESET_VOTE,
    ACTION_CHANGE_SORT,
    ACTION_TOGGLE_MAIN_CHAR_FILTER,
    ACTION_TOGGLE_VS_CHAR_FILTER,
    ACTION_TOGGLE_STAGE_FILTER,
    ACTION_TOGGLE_STANDALONE_TAG_FILTER
} from './reducer';

export function addBit(bit, fromJson = false) {
  return {
    type: ACTION_ADD_BIT,
    data: { bit: bit, fromJson: fromJson }
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

export function toggleMainCharFilter(char) {
  return {
    type: ACTION_TOGGLE_MAIN_CHAR_FILTER,
    data: char
  }
}

export function toggleVsCharFilter(char) {
  return {
    type: ACTION_TOGGLE_VS_CHAR_FILTER,
    data: char
  }
}

export function toggleStageFilter(stage) {
  return {
    type: ACTION_TOGGLE_STAGE_FILTER,
    data: stage
  }
}

export function toggleStandaloneTagFilter(tag) {
  return {
    type: ACTION_TOGGLE_STANDALONE_TAG_FILTER,
    data: tag
  }
}