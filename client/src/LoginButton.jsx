import React from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'react-bootstrap';

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
      <a href='http://localhost:3001/login/twitter'>
        <Button>Log in with Twitter</Button>
      </a>
    );
  }
 };

const mapStateToProps = state => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, null)(LoginButton);
