import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';

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

    ReadableAPI.addComment(parentId, body, author)
               .then((c) => this.props.addComment(c));
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

export default AddCommentForm;
