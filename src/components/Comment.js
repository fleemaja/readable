import React, { Component } from 'react';
import EditCommentForm from './EditCommentForm';
import { apiCommentVote, apiCommentDelete } from '../actions';
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';

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

  vote(voteType) {
    const commentId = this.props.comment.id;
    this.props.commentVote(commentId, voteType);
  }

  editComment(editedComment) {
    this.setState({ comment: editedComment });
  }

  render() {
    const comment = this.state.comment;
    const timeAgo = moment(`${comment.timestamp}`, "x").fromNow();
    return (
      <div className="Comment">
        <div className="vote-component">
          <FaCaretUp className="voteButton" onClick={this.vote.bind(this, "upVote")} />
          <strong>{comment.voteScore}</strong>
          <FaCaretDown className="voteButton" onClick={this.vote.bind(this, "downVote")} />
        </div>
        <div className="comment-info">
          <p className="comment-body">{ comment.body }</p>
          <p>
            { `submitted ${timeAgo} from ${comment.author}` }
          </p>
          <div className="modify-buttons">
            <FaClose className="delete-button" onClick={this.deleteComment.bind(this)} />
            <EditCommentForm comment={comment} editComment={this.editComment.bind(this)} />
          </div>
        </div>
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
