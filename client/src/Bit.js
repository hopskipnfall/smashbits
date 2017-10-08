import React from 'react';
import { Map } from 'immutable';

export default function Bit(props) {
  const { bit = new Map() } = props;
  return (
    <div className="panel panel-default">
      <div className = "panel-heading">
        <h3 className="panel-title">
          <button type="button" className="btn thumbs-down-button-margin">
            <span className="glyphicon glyphicon-thumbs-down" />
          </button>
          {bit.get('upvotes') - bit.get('downvotes')}
          <button type="button" className="btn thumbs-up-button-margin">
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
