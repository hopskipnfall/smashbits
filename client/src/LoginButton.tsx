import * as React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { initTwitterLogin } from './api_client';
import { AppFunctionComponent, AppState } from './store';

type InputProps = {
  loginText?: string;

  // TODO: Figure out how to pull this directly from ButtonProps.variant.
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  profile: state.profile.profile,
});

const LoginButton: AppFunctionComponent<InputProps, typeof mapStateToProps> = (
  props,
) => {
  const {
    variant = 'primary',
    profile,
    thunkFetchProfile,
    loginText = 'Log in with Twitter',
  } = props;
  if (profile) {
    return <Badge>Welcome, {profile.user.twitterProfile.displayName}!</Badge>;
  }
  thunkFetchProfile();
  return (
    <Button variant={variant} onClick={() => initTwitterLogin()}>
      {loginText}
    </Button>
  );
};

export default connect(mapStateToProps, allActions)(LoginButton);
