import { AddCommentsAction } from './types';
import { Comment } from "../../types";
import { ADD_COMMENTS } from "./types";
import * as Immutable from 'immutable';

export const addComments = (items: Immutable.Map<string, Comment>) => ({
  type: ADD_COMMENTS,
  items: items,
} as AddCommentsAction);
