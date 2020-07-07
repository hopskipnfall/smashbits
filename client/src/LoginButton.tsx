import * as React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initTwitterLogin } from './api_client';
import allActions from './all_actions';
import { AppFunctionComponent, NOOP, AppState } from './store';

type InputProps = {
};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  profile: state.profile.profile,
});

const LoginButton: AppFunctionComponent<InputProps, typeof mapStateToProps> = props => {
  const {
    profile, thunkFetchProfile
  } = props;
  const variant = 'primary';
  const loginText = 'Log in with Twitter';
  if (profile) {
    return (
      <Badge>
        Welcome,
        {' '}
        {profile.twitterProfile.displayName}
        !
      </Badge>
    );
  }
  thunkFetchProfile();
  return (
    <Button variant={variant} onClick={() => initTwitterLogin()}>{loginText}</Button>
  );
};

export default connect(mapStateToProps, allActions)(LoginButton);
