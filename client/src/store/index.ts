import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { bitsReducer } from './bits/reducers';
import * as bitsActions from './bits/actions';
import * as filteringActions from './filtering/actions';
import {filteringReducer} from './filtering/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { RouteChildrenProps } from 'react-router-dom';
import { Component, FunctionComponent } from 'react';

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

export class AppComponent<RequiredProps, StateToProps extends (...args: any) => any, DispatchToProps extends (...args: any) => any> extends Component<RequiredProps & ReturnType<StateToProps> & ReturnType<DispatchToProps> & PropsFromRedux, AppState> {};

export interface AppFunctionComponent<RequiredProps, StateToProps extends (...args: any) => any, DispatchToProps extends (...args: any) => any> extends FunctionComponent<RequiredProps & ReturnType<StateToProps> & ReturnType<DispatchToProps>> {};

export type NOOP = () => {};

export function wrapWithDispatch(thunkActionBuilder: (...args: any) => ThunkAction<void, AppState, unknown, AnyAction>, dispatch: ThunkDispatch<AppState, null, AnyAction>) {
  return (...args: Parameters<typeof thunkActionBuilder>) => dispatch(thunkActionBuilder(args));
}
