import * as React from 'react';
import { Component } from 'react';
import {
  Button, ControlLabel, FormControl, Modal, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import { Control, LocalForm } from 'react-redux-form';

type Props = {
  createBit: any
  show: any
  onHide: any
  allChars: any
  allStages: any
  allTags: any
}

class CreateBitModal extends Component<Props> {
  constructor(props: Props, context: Map<string, any>) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: any) {
    const { createBit } = this.props;
    createBit(values);
  }

  render() {
    const {
      show, onHide, allChars, allStages, allTags,
    } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <h3>Create a Bit!</h3>
        </Modal.Header>
        <Modal.Body>
          <LocalForm onSubmit={values => this.handleSubmit(values)}
          //  id="bit-form"
           >
            <ControlLabel> Title </ControlLabel>
            <Control.text
              model=".title"
              component={FormControl}
              placeholder="Enter title"
            />
            {/* TODO(thenuge): Add a char limit and message when they get close to it */}
            <ControlLabel> Content </ControlLabel>
            <Control.text
              model=".content"
              component={FormControl}
              // componentClass="textarea"
              placeholder="Write your bit!"
            />
            <ControlLabel> Main Characters </ControlLabel>
            <Control
              model=".mainChars[]"
              component={ToggleButtonGroup}
              type="checkbox"
            >
              {allChars.map((char: string) => (
                <ToggleButton
                  value={char}
                  key={char}
                >
                  {char}
                </ToggleButton>
              ))}
            </Control>
            <br />
            {' '}
            <br />
            <ControlLabel> Vs. Characters </ControlLabel>
            <Control
              model=".vsChars[]"
              component={ToggleButtonGroup}
              type="checkbox"
            >
              {allChars.map((char: string) => (
                <ToggleButton
                  value={char}
                  key={char}
                >
                  {char}
                </ToggleButton>
              ))}
            </Control>
            <br />
            {' '}
            <br />
            <ControlLabel> On Stages </ControlLabel>
            <Control
              model=".stages[]"
              component={ToggleButtonGroup}
              type="checkbox"
            >
              {allStages.map((stage: string) => (
                <ToggleButton
                  value={stage}
                  key={stage}
                >
                  {stage}
                </ToggleButton>
              ))}
            </Control>
            <br />
            {' '}
            <br />
            <ControlLabel> With Tags </ControlLabel>
            <Control
              model=".tags[]"
              component={ToggleButtonGroup}
              type="checkbox"
            >
              {allTags.map((tag: string) => (
                <ToggleButton
                  value={tag}
                  key={tag}
                >
                  {tag}
                </ToggleButton>
              ))}
            </Control>
          </LocalForm>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>
            Cancel
          </Button>
          <Button bsStyle="primary" type="submit" form="bit-form">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateBitModal;
