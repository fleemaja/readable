import React, { Component } from 'react';
import { apiAddComment } from '../actions';
import { connect } from 'react-redux';

const initialState = {
  author: '',
  body: ''
}

class AddCommentForm extends Component {
  
  state = initialState

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const parentId = this.props.parentId;

    this.props.addComment(parentId, body, author);

    this.setState(initialState);
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let stateObj = Object.assign({}, this.state);
    stateObj[property] = newVal;

    this.setState(stateObj);
  }

  render() {
    return (
      <div className="add-comment-form">
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label for="add-author">
            <p>Author</p>
            <input type="text" placeholder="comment author" name="author" id="add-author"
                   value={this.state.author} onChange={this.handleInput.bind(this)} />
          </label>
          <label for="add-body">
            <p>Body</p>
            <input type="text" placeholder="add comment" name="body"
                   value={this.state.body} onChange={this.handleInput.bind(this)} />
          </label>
          <input type="submit" />
        </form>
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
    addComment: (parentId, body, author) =>
      dispatch(apiAddComment(parentId, body, author))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
