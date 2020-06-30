import { Map } from 'immutable';
import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as styles from './Bit.sass';
import BitTagPills from './BitTagPills';
import { USER_DOWNVOTE, USER_UPVOTE } from './reducer';

export default function Bit(props: any) {
  const { bit = Map<string, any>(), upvote, downvote } = props;
  const header = (
    <h3>
      <Button variant={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => upvote(bit.get('postId'))}>
        <span className="glyphicon glyphicon-thumbs-up" />
      </Button>
      {bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0)}
      <Button variant={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => downvote(bit.get('postId'))}>
        <span className="glyphicon glyphicon-thumbs-down" />
      </Button>
      <span className={styles.title}>{bit.get('title')}</span>
    </h3>
  );
  return (
    <Card>
      <Card.Header>{header}</Card.Header>
      <div>
        <BitTagPills bit={bit} {...props} />
        <p>
          <b>{bit.get('author', Map<string, any>()).get('name')}</b>
          {' '}
          •
          {' '}
          <i>{new Date(bit.get('dateCreated')).toDateString()}</i>
        </p>
        {bit.get('content')}
        <p>
          <Link to={`/bits/${bit.get('postId')}`}>permalink</Link>
        </p>
      </div>
    </Card>
  );
}

const getDownvoteButtonStyle = (bit: Map<string, any>) => (bit.get('userVote') === USER_DOWNVOTE ? 'danger' : 'primary');

const getUpvoteButtonStyle = (bit: Map<string, any>) => (bit.get('userVote') === USER_UPVOTE ? 'success' : 'primary');
