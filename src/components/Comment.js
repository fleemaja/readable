import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import EditCommentForm from './EditCommentForm';

class Comment extends Component {

  state = {
    comment: {}
  }

  deleteComment() {
    const commentId = this.state.comment.id;
    ReadableAPI.deleteComment(commentId)
               .then((data) => this.props.updateComments(data));
  }

  componentWillMount() {
    this.setState({ comment: this.props.comment });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comment: nextProps.comment });
  }

  vote(e) {
    const voteType = e.target.value;
    const commentId = this.props.comment.id;

    ReadableAPI.commentVote(commentId, voteType).then((comment) => this.setState({comment}))
  }

  editComment(editedComment) {
    this.setState({ comment: editedComment });
  }

  render() {
    const comment = this.state.comment;
    return (
      <div className="Comment">
        <input type="button" value="upVote" onClick={this.vote.bind(this)} />
        <input type="button" value="downVote" onClick={this.vote.bind(this)} />
        <strong>{`voteScore: ${comment.voteScore}`}</strong>
        <p>{ comment.title }</p>
        <p>{ comment.body }</p>
        <p>{ comment.author }</p>
        <p>{ comment.timestamp}</p>
        <input type="button" value="DELETE" onClick={this.deleteComment.bind(this)} />
        <EditCommentForm comment={comment} editComment={this.editComment.bind(this)} />
      </div>
    )
  }
}

export default Comment;
