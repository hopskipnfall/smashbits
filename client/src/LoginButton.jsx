import React from 'react';
import { Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import { initTwitterLogin } from './api_client';

const LoginButton = props => {
  const {
    profile, bsStyle = 'default', loginText = 'Log in with Twitter', fetchProfileIfNeeded,
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
    <Button bsStyle={bsStyle} onClick={() => initTwitterLogin()}>{loginText}</Button>
  );
};

const mapStateToProps = state => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, actionCreators)(LoginButton);
