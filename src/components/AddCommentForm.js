import React, { Component } from 'react';
import { apiAddComment } from '../actions';
import { connect } from 'react-redux';

class AddCommentForm extends Component {
  state = {
    author: '',
    body: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const parentId = this.props.parentId;

    this.props.addComment(parentId, body, author);
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
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="comment author" name="author"
               value={this.state.author} onChange={this.handleInput.bind(this)} />
        <input type="text" placeholder="add comment" name="body"
               value={this.state.body} onChange={this.handleInput.bind(this)} />
        <input type="submit" />
      </form>
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
