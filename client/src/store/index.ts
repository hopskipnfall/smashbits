import { createStore, applyMiddleware, combineReducers, AnyAction, Action } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { bitsReducer } from './bits/reducers';
import * as bitsActions from './bits/actions';
import * as filteringActions from './filtering/actions';
import {filteringReducer} from './filtering/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { RouteChildrenProps } from 'react-router-dom';
import { Component, FunctionComponent } from 'react';
import { allActions, allActionTypes } from '../thunks';

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

//                                                                                          Component<InputProps & ReturnType<typeof mapStateToProps> & allActionTypes & typeof allActions & PropsFromRedux, AppState> {
export class AppComponent<RequiredProps, StateToProps extends (...args: any) => any> extends Component<RequiredProps & ReturnType<StateToProps> & typeof allActions & allActionTypes & PropsFromRedux, AppState> {};

export interface AppFunctionComponent<RequiredProps, StateToProps extends (...args: any) => any, DispatchToProps extends (...args: any) => any> extends FunctionComponent<RequiredProps & ReturnType<StateToProps> & ReturnType<DispatchToProps>> {};

export type NOOP = () => {};

export function wrapThunkWithDispatch(thunkActionBuilder: (...args: any) => ThunkAction<void, AppState, unknown, AnyAction>, dispatch: ThunkDispatch<AppState, null, AnyAction>) {
  return (...args: Parameters<typeof thunkActionBuilder>) => dispatch(thunkActionBuilder(args));
}

export function wrapWithDispatch(thunkActionBuilder: (...args: any) => AnyAction, dispatch: ThunkDispatch<AppState, null, AnyAction>) {
  return (...args: Parameters<typeof thunkActionBuilder>) => dispatch(thunkActionBuilder(args));
}

