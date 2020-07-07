import { Component, FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { allActions } from '../all_actions';
import { bitsReducer } from './bits/reducers';
import { filteringReducer } from './filtering/reducers';
import { profileReducer } from './profile/reducers';

const rootReducer = combineReducers({
  bits: bitsReducer,
  filtering: filteringReducer,
  profile: profileReducer,
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

const connector = connect(null, allActions);
export type PropsFromRedux = ConnectedProps<typeof connector> & RouteChildrenProps<any>;

export class AppComponent<RequiredProps, StateToProps extends (...args: any) => any, ComponentState = {}> extends Component<RequiredProps & ReturnType<StateToProps> & PropsFromRedux, ComponentState> { };

export interface AppFunctionComponent<RequiredProps, StateToProps extends (...args: any) => any, ComponentState = {}>
  extends FunctionComponent<RequiredProps & ReturnType<StateToProps> & ConnectedProps<typeof connector>> { };

export type AppMapStateToProps<InputProps> = (state: AppState, ownProps: InputProps) => unknown;

export type NOOP = () => {};

export function wrapThunkWithDispatch(thunkActionBuilder:
  (...args: any) => ThunkAction<void, AppState, unknown, AnyAction>, dispatch: ThunkDispatch<AppState, null, AnyAction>) {
  return (...args: Parameters<typeof thunkActionBuilder>) => dispatch(thunkActionBuilder(args));
}

export function wrapWithDispatch(thunkActionBuilder:
  (...args: any) => AnyAction, dispatch: ThunkDispatch<AppState, null, AnyAction>) {
  return (...args: Parameters<typeof thunkActionBuilder>) => dispatch(thunkActionBuilder(args));
}
