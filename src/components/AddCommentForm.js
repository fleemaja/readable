import React, { Component } from 'react';
import { apiAddComment, changeCommentForm } from '../actions';
import { connect } from 'react-redux';

class AddCommentForm extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const comment = this.props.comment;
    const parentId = this.props.parentId;
    this.props.addComment(parentId, comment);
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let comment = Object.assign({}, this.props.comment);
    comment[property] = newVal;

    this.props.changeComment(comment);
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="add-comment-form">
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label for="add-author">
            <p>Author</p>
            <input type="text" placeholder="comment author" name="author" id="add-author"
                   value={comment.author} onChange={this.handleInput.bind(this)} />
          </label>
          <label for="add-body">
            <p>Body</p>
            <input type="text" placeholder="add comment" name="body" id="add-body"
                   value={comment.body} onChange={this.handleInput.bind(this)} />
          </label>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    comments: state.comments,
    comment: state.comment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (parentId, comment) =>
      dispatch(apiAddComment(parentId, comment)),
    changeComment: (comment) => dispatch(changeCommentForm(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
