import React, { Component } from 'react';
import Post from './Post';
import './Posts.css';

class Posts extends Component {
  render() {
    let posts = [];
    for (var i = 0; i < 15; i++) {
      posts.push(<Post />)
    }
    return (
      <div className="Posts">
        { posts }
      </div>
    )
  }
}

export default Posts;
