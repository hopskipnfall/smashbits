import React from 'react';
import { Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initTwitterLogin } from './api_client';

const LoginButton = props => {
  const { profile, bsStyle = 'default', loginText = 'Log in with Twitter' } = props;
  if (profile) {
    return (
      <Label>
        Welcome, {profile.get('displayName')}!
      </Label>
    );
  } else {
    return (
      <Button bsStyle={bsStyle} onClick={() => initTwitterLogin()}>{loginText}</Button>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, null)(LoginButton);
