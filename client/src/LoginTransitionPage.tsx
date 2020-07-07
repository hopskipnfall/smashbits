import { Component } from 'react';
import { connect } from 'react-redux';
import { AppComponent, NOOP } from './store';
import allActions from './all_actions';


type InputProps = {
};

/**
 * Serves as a temporary, blank page after a successful OAuth login as we fetch
 * the user's profile data.
 */
class LoginTransitionPage extends AppComponent<InputProps, NOOP> {
  componentDidMount() {
    const { thunkFetchProfile } = this.props;
    thunkFetchProfile('/');
  }

  render() {
    return null;
  }
}

export default connect(null, allActions)(LoginTransitionPage);
