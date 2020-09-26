import * as React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { FcHighPriority, FcOk } from 'react-icons/fc';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allActions } from './all_actions';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import FormattedTextBox from './FormattedTextBox';
import EmbeddedMediaContainer from './EmbeddedMediaContainer';
import { AppFunctionComponent, AppState } from './store';
import { VOTE_DOWN, VOTE_UP } from './store/bits/types';
import { Bit as BitType, Status } from './types';

type InputProps = {
  bit: BitType
};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  optimistic: state.bits.optimisticItems.get(ownProps.bit.postId) != undefined,
});

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_DOWN ? 'danger' : 'primary');
const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_UP ? 'success' : 'primary');

const STATUS_TO_ICON = new Map([
  [Status.Saving, <Spinner animation="border" variant="primary" />],
  [Status.Saved, <FcOk />],
  [Status.Error, <FcHighPriority />],
]);

const Bit: AppFunctionComponent<InputProps, typeof mapStateToProps> = props => {
  const { bit, optimistic, thunkChangeVote } = props;
  const header = (
    <h3>
      <Button variant={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => thunkChangeVote(bit.postId, VOTE_UP)}>
        <span className="glyphicon glyphicon-thumbs-up" />
      </Button>
      {bit.upvotes - bit.downvotes + bit.userVote}
      <Button variant={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => thunkChangeVote(bit.postId, VOTE_DOWN)}>
        <span className="glyphicon glyphicon-thumbs-down" />
      </Button>
      <span className={styles.title}>{bit.title}</span>
    </h3>
  );
  return (
    <Card>
      <Card.Header>{header}</Card.Header>
      <div>
        <BitTagPills bit={bit} />
        {optimistic
          ? (<div>
            {STATUS_TO_ICON.get(bit.status)}
            {' '}
            <b>{bit.status}</b>
          </div>)
          : (<p>
            <b>{bit.author.name}</b>
            {' '}
        •
            {' '}
            <i>{new Date(bit.dateCreated).toDateString()}</i>
          </p>)
        }
        <FormattedTextBox content={bit.content} />
        {bit.media?.length > 0
          && <EmbeddedMediaContainer contentUri={bit.media[0].uri} />}
        <p>
          <Link to={`/bits/${bit.postId}`}>permalink</Link>
        </p>
      </div>
    </Card>
  );
}

export default connect(mapStateToProps, allActions)(Bit);
