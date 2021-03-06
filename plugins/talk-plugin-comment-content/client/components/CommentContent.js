import React from 'react';
import Linkify from 'react-linkify';

const name = 'talk-plugin-comment-content';

const CommentContent = ({ comment }) => {
  const textbreaks = comment.body.split('\n');
  return (
    <span className={`${name}-text`}>
      {textbreaks.map((line, i) => {
        return (
          <span key={i} className={`${name}-line`}>
            <Linkify properties={{ target: '_blank' }}>{line.trim()}</Linkify>
            {i !== textbreaks.length - 1 && (
              <br className={`${name}-linebreak`} />
            )}
          </span>
        );
      })}
    </span>
  );
};

export default CommentContent;
