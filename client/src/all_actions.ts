
import * as bitsActions from './store/bits/actions';
import * as filteringActions from './store/filtering/actions';
import * as thunkActions from './thunks';

export const allActions = {
  ...bitsActions,
  ...filteringActions,
  ...thunkActions,
}
