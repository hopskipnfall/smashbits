import * as React from 'react';
import { Component } from 'react';
import {
  Button, FormLabel, FormControl, Modal, ToggleButton, ToggleButtonGroup,
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
            <FormLabel> Title </FormLabel>
            <Control.text
              model=".title"
              component={FormControl}
              placeholder="Enter title"
            />
            {/* TODO(thenuge): Add a char limit and message when they get close to it */}
            <FormLabel> Content </FormLabel>
            <Control.text
              model=".content"
              component={FormControl}
              as="textarea"
              placeholder="Write your bit!"
            />
            <FormLabel> Main Characters </FormLabel>
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
            <FormLabel> Vs. Characters </FormLabel>
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
            <FormLabel> On Stages </FormLabel>
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
            <FormLabel> With Tags </FormLabel>
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
          <Button variant="primary" type="submit" form="bit-form">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateBitModal;
