import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';

class LoginTransitionPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { fetchProfile } = this.props;
    fetchProfile('/');
  }

  render() {
    return null;
  }
}

export default connect(null, actionCreators)(LoginTransitionPage);