import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    if (comment) {
      return (
          <div className="Comment">
            <strong>{`voteScore: ${comment.voteScore}`}</strong>
            <p>{ comment.title }</p>
            <p>{ comment.body }</p>
            <p>{ comment.author }</p>
            <p>{ comment.timestamp}</p>
          </div>
        )
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default Comment;
