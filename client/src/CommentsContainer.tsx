import { Map, Set } from 'immutable';
import * as React from 'react';

export default function CommentsContainer(props: any) {
  const { bit, comments = Map() } = props;
  return (
    <div>
      {bit.get('comments', Set()).map((commentId: string) => {
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
}
