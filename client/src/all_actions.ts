
import * as bitsActions from './store/bits/actions';
import * as filteringActions from './store/filtering/actions';
import * as thunkActions from './thunks';
import * as commentsActions from './store/comments/actions';

export default {
  ...bitsActions,
  ...filteringActions,
  ...thunkActions,
  // ...commentsActions,
}
