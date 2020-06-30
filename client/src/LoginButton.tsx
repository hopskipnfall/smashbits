import * as React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import { initTwitterLogin } from './api_client';

const LoginButton = (props: any) => {
  const {
    profile, variant = 'default', loginText = 'Log in with Twitter', fetchProfileIfNeeded,
  } = props;
  if (profile) {
    return (
      <Badge>
        Welcome,
        {' '}
        {profile.getIn(['twitterProfile', 'displayName'])}
        !
      </Badge>
    );
  }
  fetchProfileIfNeeded();
  return (
    <Button variant={variant} onClick={() => initTwitterLogin()}>{loginText}</Button>
  );
};

const mapStateToProps = (state: Map<string, any>) => ({
  profile: state.get('profile'),
});

export default connect(mapStateToProps, actionCreators)(LoginButton);
