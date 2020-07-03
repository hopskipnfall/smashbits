import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { bitsReducer } from './bits/reducers';
import * as bitsActions from './bits/actions';
import * as filteringActions from './filtering/actions';
import {filteringReducer} from './filtering/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { RouteChildrenProps } from 'react-router-dom';

const rootReducer = combineReducers({
  bits: bitsReducer,
  filtering: filteringReducer,
});

export type AppState = ReturnType<typeof rootReducer>

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  )

  return createStore(rootReducer, middlewareEnhancer);
}

const combinedActions = {
  actions: {
    bits: bitsActions,
    filtering: filteringActions,
  }
}

const connector = connect(null, combinedActions);
/** Joined type of everything that gets passed to components. */
export type PropsFromRedux = ConnectedProps<typeof connector> & RouteChildrenProps<any>;
