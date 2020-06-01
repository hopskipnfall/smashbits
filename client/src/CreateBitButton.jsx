import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import CreateBitModal from './CreateBitModal';

class CreateBitButton extends Component {

  constructor(props, context) {
    super(props, context);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      show: false
    };
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    const { filtering, createBit } = this.props;
    return ([
      <Button bsStyle="danger" onClick={this.show} key="create-bit-button">
        Create new bit
      </Button>,
      <CreateBitModal show={this.state.show} createBit={createBit} onHide={this.hide} key="create-bit-modal"
        allChars={filtering.get('chars')}
        allStages={filtering.get('stages')}
        allTags={filtering.get('standaloneTags')} />
    ]);
  };
}

const mapStateToProps = state => ({
  filtering: state.get('filtering')
});

export default connect(mapStateToProps, actionCreators)(CreateBitButton);
