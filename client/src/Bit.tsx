import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allActions } from './all_actions';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import { AppFunctionComponent, NOOP } from './store';
import { VOTE_DOWN, VOTE_UP } from './store/bits/types';
import { Bit as BitType } from './types';

type InputProps = {
  bit: BitType
};

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_DOWN ? 'danger' : 'primary');
const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_UP ? 'success' : 'primary');

const Bit: AppFunctionComponent<InputProps, NOOP> = props => {
  const { bit, thunkChangeVote } = props;
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
        <p>
          <b>{bit.author?.name || ''}</b>
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

export default connect(null, allActions)(Bit);
