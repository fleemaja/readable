import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

class Post extends Component {
  render() {
    const post = this.props.post;
    if (post) {
      return (
          <div className="Post">
            <strong>{`voteScore: ${post.voteScore}`}</strong>
            <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
            <p>{ post.body }</p>
            <p>{ post.author }</p>
            <p>{ post.category}</p>
            <p>{ post.timestamp}</p>
          </div>
        )
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default Post;
