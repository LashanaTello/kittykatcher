import React from 'react';

const PostDetails = ({ post }) => {
  return (
    <div className="container">
      hello, {post.myTitle}
    </div>
  );
}

export default PostDetails;
