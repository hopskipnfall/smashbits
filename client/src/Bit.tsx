import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import { USER_DOWNVOTE, USER_UPVOTE } from './reducer';
import { Bit as BitType } from './types';

export default function Bit(props: any) {
  const { bit = new BitType(), upvote, downvote } = props;
  const header = (
    <h3>
      <Button variant={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => upvote(bit.postId)}>
        <span className="glyphicon glyphicon-thumbs-up" />
      </Button>
      {bit.upvotes - bit.downvotes + bit.userVote}
      <Button variant={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => downvote(bit.postId)}>
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

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === USER_DOWNVOTE ? 'danger' : 'primary');

const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === USER_UPVOTE ? 'success' : 'primary');
