import * as bitsActions from './store/bits/actions';
import * as commentsActions from './store/comments/actions';
import * as filteringActions from './store/filtering/actions';
import * as thunkActions from './thunks';

export const allActions = {
  ...bitsActions,
  ...commentsActions,
  ...filteringActions,
  ...thunkActions,
};
