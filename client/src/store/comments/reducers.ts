import * as Immutable from 'immutable';
import { Comment } from '../../types';
import { ADD_COMMENTS, CommentsActionTypes, CommentsState } from './types';

export function setCommentState(state: CommentsState, id: string) {
  return {
    /** Clone and edit a copy of the comment. */
    edit(editFn: (comment: Comment) => void): CommentsState {
      const clonedComment = new Comment(state.items.get(id));
      editFn(clonedComment);

      return {
        ...state,
        items: state.items.set(id, clonedComment),
      };
    },

    /** Add a new comment to the state. */
    insert(comment: Comment): CommentsState {
      return {
        ...state,
        items: state.items.set(id, comment),
      };
    },
  };
}

const initialState: CommentsState = {
  items: Immutable.Map<string, Comment>(),
};

export function commentsReducer(
  state = initialState,
  action: CommentsActionTypes,
): CommentsState {
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        items: state.items.merge(action.items),
      };
    default:
      return state;
  }
}
