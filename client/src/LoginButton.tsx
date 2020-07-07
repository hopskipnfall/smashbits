import * as React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import allActions from './all_actions';
import { initTwitterLogin } from './api_client';
import { AppFunctionComponent, AppState } from './store';

type InputProps = {};

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
        {profile.user.twitterProfile.displayName}
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
