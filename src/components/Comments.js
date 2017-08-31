import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {

  render() {
    return (
      <div className="Comments">
        {
          this.props.comments.map((c) =>
            <Comment key={c.timestamp}
                     comment={c} />
          )
        }
      </div>
    )
  }
}

export default Comments;
