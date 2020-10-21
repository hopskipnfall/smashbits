import { Component, FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { allActions } from '../all_actions';
import { bitsReducer } from './bits/reducers';
import { commentsReducer } from './comments/reducers';
import { filteringReducer } from './filtering/reducers';
import { profileReducer } from './profile/reducers';

const rootReducer = combineReducers({
  bits: bitsReducer,
  comments: commentsReducer,
  filtering: filteringReducer,
  profile: profileReducer,
});

// TODO Find a better place for these types.

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer),
  );

  return createStore(rootReducer, middlewareEnhancer);
}

const connector = connect(null, allActions);

/**
 * Component class.
 *
 * @param <InputParams> parameters passed directly in JSX file
 * @param <StateToProps> "typeof mapStateToProps". Use {@link NOOP} if N/A.
 * @param <ComponentState> // TODO(jonnjonn): Use this to type the state object.
 */
// eslint-disable-next-line react/prefer-stateless-function
export class AppComponent<
  InputParams,
  StateToProps extends (...args: any) => any,
  ComponentState = {}
> extends Component<
  InputParams & ReturnType<StateToProps> & ConnectedProps<typeof connector>
> {}

/**
 * Component class arranged by a router.
 *
 * This class will have additional properties (see {@link RouteChildrenProps}).
 *
 * @param <StateToProps> "typeof mapStateToProps". Use {@link NOOP} if N/A.
 * @param <ComponentState> // TODO(jonnjonn): Use this to type the state object.
 */
export class AppRouteComponent<
  StateToProps extends (...args: any) => any,
  ComponentState = {}
> extends AppComponent<RouteChildrenProps, StateToProps, ComponentState> {}

/**
 * Component defined as a single function.
 *
 * @param <InputParams> parameters passed directly in JSX file
 * @param <StateToProps> "typeof mapStateToProps". Use {@link NOOP} if N/A.
 */
export interface AppFunctionComponent<
  InputParams,
  StateToProps extends (...args: any) => any,
  ComponentState = {}
> extends FunctionComponent<
    InputParams & ReturnType<StateToProps> & ConnectedProps<typeof connector>
  > {}

export type NOOP = () => {};
