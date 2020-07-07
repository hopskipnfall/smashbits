import { connect } from 'react-redux';
import allActions from './all_actions';
import { AppComponent, NOOP } from './store';


type InputProps = {};

/**
 * Serves as a temporary, blank page after a successful OAuth login as we fetch
 * the user's profile data.
 */
class LoginTransitionPage extends AppComponent<InputProps, NOOP> {
  componentDidMount() {
    const { thunkFetchProfile } = this.props;
    thunkFetchProfile('/');
  }

  render() {
    return null;
  }
}

export default connect(null, allActions)(LoginTransitionPage);
