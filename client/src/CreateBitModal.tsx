import * as React from 'react';
import { Button, FormControl, FormLabel, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import { allActions } from './all_actions';
import { AppFunctionComponent, AppState } from './store';
import { ALL_CHARACTERS, Bit, LABEL_MAP, STAGE_MAP } from './types';

type InputProps = {
  show: boolean;
  onHide: any;
};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  profile: state.profile.profile,
});

const CreateBitModal: AppFunctionComponent<InputProps, typeof mapStateToProps> = (props) => {
  const { show, onHide, thunkPostBit, profile } = props;
  const initialState = {
    postId: `fakeId${new Date().getMilliseconds()}`,
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      // lol... https://stackoverflow.com/a/49965199/2875073
      animation={false}
    >
      <LocalForm
        initialState={initialState}
        onSubmit={(values) => {
          values = { ...values, media: [{ uri: values.mediaUri }] };
          thunkPostBit(new Bit(values));
          onHide();
        }}
      >
        <Modal.Header>
          <h3>Create a Bit!</h3>
        </Modal.Header>
        <Modal.Body>
          <FormLabel> Title </FormLabel>
          <Control.text model=".title" component={FormControl} placeholder="Enter title" />
          {/* TODO(thenuge): Add a char limit and message when they get close to it */}
          <FormLabel> Content </FormLabel>
          <Control.text model=".content" component={FormControl} as="textarea" /*  */ placeholder="Write your bit!" />
          <FormLabel> Embedded Media (optional) </FormLabel>
          <Control.text model=".mediaUri" component={FormControl} placeholder="Media URL (limit 1)" />
          <FormLabel> Main Characters </FormLabel>
          <Control model=".mainChars[]" component={ToggleButtonGroup} type="checkbox">
            {Array.from(ALL_CHARACTERS).map((char) => (
              <ToggleButton value={char.id} key={`main${char.id}`}>
                {char.display}
              </ToggleButton>
            ))}
          </Control>
          <br /> <br />
          <FormLabel> Vs. Characters </FormLabel>
          <Control model=".vsChars[]" component={ToggleButtonGroup} type="checkbox">
            {Array.from(ALL_CHARACTERS).map((char) => (
              <ToggleButton value={char.id} key={`vs${char.id}`}>
                {char.display}
              </ToggleButton>
            ))}
          </Control>
          <br /> <br />
          <FormLabel> On Stages </FormLabel>
          <Control model=".stages[]" component={ToggleButtonGroup} type="checkbox">
            {Array.from(STAGE_MAP.values()).map((stage) => (
              <ToggleButton value={stage.id} key={`stage${stage.id}`}>
                {stage.display}
              </ToggleButton>
            ))}
          </Control>
          <br /> <br />
          <FormLabel> With Tags </FormLabel>
          <Control model=".standaloneTags[]" component={ToggleButtonGroup} type="checkbox">
            {Array.from(LABEL_MAP.values()).map((label) => (
              <ToggleButton value={label.id} key={`tag${label.id}`}>
                {label.display}
              </ToggleButton>
            ))}
          </Control>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {/* FIXME: Submitting works... but fails to render the page afterward. */}
            Submit
          </Button>
        </Modal.Footer>
      </LocalForm>
    </Modal>
  );
};

export default connect(mapStateToProps, allActions)(CreateBitModal);
