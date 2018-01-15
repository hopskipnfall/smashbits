import React from 'react';
import { Map } from 'immutable';
import { USER_UPVOTE, USER_DOWNVOTE } from './reducer';
import { Panel, Button } from 'react-bootstrap';

export default function Bit(props) {
  const { bit = new Map(), upvote, downvote } = props;
  const header = (
      <h3>
        <Button bsStyle={getDownvoteButtonStyle(bit)} className="thumbs-down-button-margin" onClick={() => downvote(bit.get('id'))}>
          <span className="glyphicon glyphicon-thumbs-down" />
        </Button>
        {bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0)}
        <Button bsStyle={getUpvoteButtonStyle(bit)} className="thumbs-up-button-margin" onClick={() => upvote(bit.get('id'))}>
          <span className="glyphicon glyphicon-thumbs-up" />
        </Button>
        {bit.get('title')}
      </h3>
  );
  return (
    <Panel header={header}>
      <div className="panel-body">
        <p>
          <b>{bit.get('author').get('name')}</b>
          {` \u2022 `}
          <i>{new Date(bit.get('date_created')).toDateString()}</i>
        </p>
        {bit.get('content')}
      </div>
    </Panel>
  );
}

const getDownvoteButtonStyle = bit =>
    bit.get('userVote') === USER_DOWNVOTE ? 'danger' : 'default';

const getUpvoteButtonStyle = bit =>
    bit.get('userVote') === USER_UPVOTE ? 'success' : 'default';