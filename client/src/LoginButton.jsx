import React from 'react';
import { Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import { initTwitterLogin } from './api_client';

const LoginButton = props => {
  const {
    profile, variant = 'default', loginText = 'Log in with Twitter', fetchProfileIfNeeded,
  } = props;
  if (profile) {
    return (
      <Label>
        Welcome,
        {' '}
        {profile.getIn(['twitterProfile', 'displayName'])}
        !
      </Label>
    );
  }
  fetchProfileIfNeeded();
  return (
    <Button variant={variant} onClick={() => initTwitterLogin()}>{loginText}</Button>
  );
};

const mapStateToProps = state => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, actionCreators)(LoginButton);
