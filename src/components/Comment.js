import React, { Component } from 'react';
import EditCommentForm from './EditCommentForm';
import { apiCommentVote, apiCommentDelete } from '../actions';
import { connect } from 'react-redux';

class Comment extends Component {

  state = {
    comment: {}
  }

  deleteComment() {
    const commentId = this.state.comment.id;
    this.props.deleteComment(commentId);
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

    this.props.commentVote(commentId, voteType);
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

function mapStateToProps (state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commentVote: (id, vote) => dispatch(apiCommentVote(id, vote)),
    deleteComment: (id) => dispatch(apiCommentDelete(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
