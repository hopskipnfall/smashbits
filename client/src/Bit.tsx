import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import { AppFunctionComponent, AppState, NOOP, wrapWithDispatch } from './store';
import { VOTE_DOWN, VOTE_UP } from './store/bits/types';
import { thunkChangeVote } from './thunks';
import { Bit as BitType } from './types';

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => {
  return {changeVote: wrapWithDispatch(thunkChangeVote, dispatch),}
};

type InputProps = {
  bit: BitType
};

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_DOWN ? 'danger' : 'primary');
const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_UP ? 'success' : 'primary');

const Bit: AppFunctionComponent<InputProps, NOOP, typeof mapDispatchToProps> = props => {
  const { bit, changeVote } = props;
  const header = (
    <h3>
      <Button variant={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => changeVote(bit.postId, VOTE_UP)}>
        <span className="glyphicon glyphicon-thumbs-up" />
      </Button>
      {bit.upvotes - bit.downvotes + bit.userVote}
      <Button variant={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => changeVote(bit.postId, VOTE_DOWN)}>
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
        <p>
          <b>{bit.author.name}</b>
          {' '}
          •
          {' '}
          <i>{new Date(bit.dateCreated).toDateString()}</i>
        </p>
        {bit.content}
        <p>
          <Link to={`/bits/${bit.postId}`}>permalink</Link>
        </p>
      </div>
    </Card>
  );
}

export default connect(null, mapDispatchToProps)(Bit);
