import { Map, Set } from 'immutable';
import React from 'react';

export default function CommentsContainer(props) {
  const { bit, comments = Map() } = props;
  return (
    <div>
      {bit.get('comments', Set()).map(commentId => {
        const comment = comments.get(commentId, Map());
        return (
          <div key={commentId}>
            <p>
              <b>{`${comment.getIn(['author', 'name'])} • `}</b>
              <i>{new Date(comment.get('dateCreated')).toDateString()}</i>
            </p>
            {comment.get('content')}
          </div>
        );
      })}
    </div>
  );
};
