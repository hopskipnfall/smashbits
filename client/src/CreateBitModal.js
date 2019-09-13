import React, { Component } from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Button, Modal, ControlLabel, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class CreateBitModal extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { show, onHide, allChars, allStages, allTags } = this.props;
    return (
       <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <h3>Create a Bit!</h3>
        </Modal.Header>
        <Modal.Body>
           <LocalForm onSubmit={values => this.handleSubmit(values)} id="bit-form">
            <ControlLabel> Title </ControlLabel>
            <Control.text
                model=".title"
                component={FormControl}
                placeholder="Enter title" />
            {/* TODO(thenuge): Add a char limit and message when they get close to it */}
            <ControlLabel> Content </ControlLabel>
            <Control.text
                model=".content"
                component={FormControl}
                componentClass="textarea"
                placeholder="Write your bit!" />
            <ControlLabel> Main Characters </ControlLabel>
            <Control
                model=".mainChars[]"
                component={ToggleButtonGroup}
                type="checkbox">
              {allChars.map(char =>
                  <ToggleButton
                      value={char}
                      key={char}
                      children={char} />)}
            </Control>
            <br /> <br />
            <ControlLabel> Vs. Characters </ControlLabel>
            <Control
                model=".vsChars[]"
                component={ToggleButtonGroup}
                type="checkbox">
              {allChars.map(char =>
                  <ToggleButton
                      value={char}
                      key={char}
                      children={char} />)}
            </Control>
            <br /> <br />
            <ControlLabel> On Stages </ControlLabel>
            <Control
                model=".stages[]"
                component={ToggleButtonGroup}
                type="checkbox">
              {allStages.map(stage =>
                  <ToggleButton
                      value={stage}
                      key={stage}
                      children={stage} />)}
            </Control>
            <br /> <br />
            <ControlLabel> With Tags </ControlLabel>
            <Control
                model=".tags[]"
                component={ToggleButtonGroup}
                type="checkbox">
              {allTags.map(tag =>
                  <ToggleButton
                      value={tag}
                      key={tag}
                      children={tag} />)}
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

  handleSubmit(values) {
    const { createBit } = this.props;
    // TODO(thenuge): Add the real author once we have accounts.
    createBit({...values, 'author': {
      name: 'Sakurai',
      person_id: 'ASDF424242'
    }});
  }
}

export default CreateBitModal;