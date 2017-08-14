import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  state = {
    comments: []
  }

  updateComments(deletedComment) {
    const comments = this.state.comments.filter(c => c.id !== deletedComment.id);
    this.setState({ comments });
  }

  componentWillMount() {
    this.setState({ comments: this.props.comments });
  }

  componentWillReceiveProps(newVal) {
    this.setState({ comments: newVal.comments });
  }

  render() {
    return (
      <div className="Comments">
        {
          this.state.comments.map((c) =>
            <Comment key={c.timestamp}
                     comment={c}
                     updateComments={this.updateComments.bind(this)} />
          )
        }
      </div>
    )
  }
}

export default Comments;
