import { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';

/** Serves as a temporary, blank page after a successful OAuth login as we fetch the user's profile data. */
class LoginTransitionPage extends Component<any> {
  componentDidMount() {
    const { fetchProfile } = this.props;
    fetchProfile('/');
  }

  render() {
    return null;
  }
}

export default connect(null, actionCreators)(LoginTransitionPage);
