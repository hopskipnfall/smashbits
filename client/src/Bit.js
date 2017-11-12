import React from 'react';
import { Map } from 'immutable';
import { USER_UPVOTE, USER_DOWNVOTE } from './reducer';

export default function Bit(props) {
  const { bit = new Map(), upvote, downvote } = props;
  return (
    <div className="panel panel-default">
      <div className = "panel-heading">
        <h3 className="panel-title">
          <button type="button" className={'btn thumbs-down-button-margin ' + getDownvoteButtonStyle(bit)} onClick={() => downvote(bit.get('id'))}>
            <span className="glyphicon glyphicon-thumbs-down" />
          </button>
          {bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0)}
          <button type="button" className={'btn thumbs-up-button-margin ' + getUpvoteButtonStyle(bit)} onClick={() => upvote(bit.get('id'))}>
            <span className="glyphicon glyphicon-thumbs-up" />
          </button>
          {bit.get('title')}
        </h3>
      </div>
      <div className="panel-body">
        <p>
          <b>{bit.get('author').get('name')}</b> 
          {` \u2022 `}
          <i>{bit.get('date_created').toDateString()}</i>
        </p>
        {bit.get('content')}
      </div>
    </div>
  );
}

const getDownvoteButtonStyle = bit => 
    bit.get('userVote') === USER_DOWNVOTE ? 'btn-danger' : 'btn-default';

const getUpvoteButtonStyle = bit => 
    bit.get('userVote') === USER_UPVOTE ? 'btn-success' : 'btn-default';