import * as Immutable from 'immutable';
import { Comment } from '../../types';
import { AddCommentsAction, ADD_COMMENTS } from './types';

export const addComments = (items: Immutable.Map<string, Comment>) =>
  ({
    type: ADD_COMMENTS,
    items: items,
  } as AddCommentsAction);
