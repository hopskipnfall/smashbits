import React from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'react-bootstrap';
import { initTwitterLogin } from './api_client';

const LoginButton = props => {
  const { profile } = props;
  if (profile) {
    return (
      <Label>
        Welcome, {profile.get('displayName')}!
      </Label>
    );
  } else {
    return (
      <Button onClick={() => initTwitterLogin()}>Log in with Twitter</Button>
    );
  }
 };

const mapStateToProps = state => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, null)(LoginButton);
