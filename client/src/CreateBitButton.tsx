import * as React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
// import CreateBitModal from './CreateBitModal';
// import LoginButton from './LoginButton';
import { AppComponent, NOOP } from './store';

type Parameters = {};

// class CreateBitButton extends Component<Props> {
class CreateBitButton extends AppComponent<Parameters, NOOP> {

  componentDidMount() {
    this.setState({
      show: false,
    });
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    // const { filtering, profile, createBit } = this.props;
    const profile = null;
    if (profile) {
      return ([
        <Button variant="danger" onClick={this.show} key="create-bit-button">
          Create new bit
        </Button>,
        // <CreateBitModal
        //   show={(this.state as any).show}
        //   createBit={createBit}
        //   onHide={this.hide}
        //   key="create-bit-modal"
        //   allChars={filtering.get('chars')}
        //   allStages={filtering.get('stages')}
        //   allTags={filtering.get('standaloneTags')}
        // />,
      ]);
    }
    return <div>hello world!</div>
    // return <LoginButton variant="danger" loginText="Log in to create bits" />;
  }
}

export default connect(null, allActions)(CreateBitButton);
