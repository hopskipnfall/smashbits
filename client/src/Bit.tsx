import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import { USER_DOWNVOTE, USER_UPVOTE } from './reducer';
import { Bit as BitType } from './types';
import { FunctionComponent } from 'react';
import { VOTE_UP, VOTE_DOWN } from './store/bits/types';
import { PropsFromRedux } from './store';
import {thunkChangeVote} from './thunks';
import { connect } from 'react-redux';

type BitProps = PropsFromRedux & { 
  bit: BitType
  thunkChangeVote: typeof thunkChangeVote
}

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === USER_DOWNVOTE ? 'danger' : 'primary');
const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === USER_UPVOTE ? 'success' : 'primary');

const Bit : FunctionComponent<BitProps> = props => {
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
        <BitTagPills bit={bit} {...props} />
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

export default connect(null, {thunkChangeVote})(Bit);
