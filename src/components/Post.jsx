import React from 'react';
import '../scss/Post.scss'

function Post({title, body}) {
  return (
    <li className="content__posts-item">
      <h2 className="content__post-title">{title}</h2>
      <p className="content__post-text">
        {body}
      </p>
    </li>
  );
}

export default Post;
