import * as React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import CreateBitModal from './CreateBitModal';
import LoginButton from './LoginButton';
import { AppComponent, AppState } from './store';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  profile: state.profile.profile,
});

class CreateBitButton extends AppComponent<InputProps, typeof mapStateToProps> {
  componentDidMount() {
    // TODO: Make this typed somehow..
    this.setState({
      show: false,
    });
  }

  private show() {
    this.setState({ show: true });
  }

  private hide() {
    this.setState({ show: false });
  }

  render() {
    if (this.props.profile) {
      return [
        <Button variant="danger" onClick={() => this.show()} key="create-bit-button">
          Create new bit
        </Button>,
        <CreateBitModal
          show={(this.state as { show: boolean }).show}
          onHide={() => this.hide()}
          key="create-bit-modal"
        />,
      ];
    }
    return <LoginButton variant="danger" loginText="Log in to create bits" />;
  }
}

export default connect(mapStateToProps, allActions)(CreateBitButton);
