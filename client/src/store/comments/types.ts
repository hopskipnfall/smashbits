import * as Immutable from 'immutable';
import { Comment } from '../../types';

const PREFIX = 'COMMENTS_';

export interface CommentsState {
  items: Immutable.Map<string, Comment>;
}

export const ADD_COMMENTS = PREFIX + 'ADD_COMMENTS';
export interface AddCommentsAction {
  type: typeof ADD_COMMENTS;
  items: Immutable.Map<string, Comment>;
}

export type CommentsActionTypes = AddCommentsAction;
