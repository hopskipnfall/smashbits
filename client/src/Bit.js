import React from 'react';
import { Map } from 'immutable';
import { USER_UPVOTE, USER_DOWNVOTE } from './reducer';
import { Panel, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import BitTagPills from './BitTagPills';

export default function Bit(props) {
  const { bit = new Map(), upvote, downvote } = props;
  const header = (
      <h3>
        <Button bsStyle={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => upvote(bit.get('postId'))}>
          <span className="glyphicon glyphicon-thumbs-up" />
        </Button>
        {bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0)}
        <Button bsStyle={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => downvote(bit.get('postId'))}>
          <span className="glyphicon glyphicon-thumbs-down" />
        </Button>
        {bit.get('title')}
      </h3>
  );
  return (
    <Panel header={header}>
      <div>
        <BitTagPills bit={bit} {...props} />
        <p>
          <b>{bit.get('author', new Map()).get('name')}</b>
          {` \u2022 `}
          <i>{new Date(bit.get('dateCreated')).toDateString()}</i>
        </p>
        {bit.get('content')}
        <p>
          <Link to={ '/bits/' + bit.get('postId') }>permalink</Link>
        </p>
      </div>
    </Panel>
  );
}

const getDownvoteButtonStyle = bit =>
    bit.get('userVote') === USER_DOWNVOTE ? 'danger' : 'default';

const getUpvoteButtonStyle = bit =>
    bit.get('userVote') === USER_UPVOTE ? 'success' : 'default';