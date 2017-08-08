import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  render() {
    return (
      <div className="Post">
        <p>Title</p>
        <p>Body</p>
        <p>Author</p>
        <p>Category</p>
        <p>Timestamp</p>
      </div>
    )
  }
}

export default Post;
