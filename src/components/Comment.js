import React, { Component } from 'react';
import EditCommentForm from './EditCommentForm';
import { apiCommentVote, apiCommentDelete } from '../actions/comments';
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';

class Comment extends Component {

  deleteComment() {
    const commentId = this.props.comment.id;
    this.props.deleteComment(commentId);
  }

  vote(voteType) {
    const commentId = this.props.comment.id;
    this.props.commentVote(commentId, voteType);
  }

  render() {
    const comment = this.props.comment;
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
            <EditCommentForm comment={comment} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return { comments }
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
