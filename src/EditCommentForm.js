import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import * as ReadableAPI from './ReadableAPI';
import './EditCommentForm.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditCommentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      author: '',
      body: ''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const comment = this.props.comment;
    this.setState({ author: comment.author, body: comment.body })
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const commentId = this.props.comment.id;

    ReadableAPI.editComment(commentId, author, body)
               .then((c) => {
                 this.props.editComment(c)
                 this.closeModal()
               });
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let stateObj = Object.assign({}, this.state);
    stateObj[property] = newVal;

    this.setState(stateObj);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#767676';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="modal">
        <button className="edit" onClick={this.openModal}>Edit Comment</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add a New Comment</h2>
          <button onClick={this.closeModal}>CLOSE</button>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="comment author"
                   name="author" value={this.state.author}
                   onChange={this.handleInput.bind(this)} />
            <textarea placeholder="comment body" name="body"
                      value={this.state.body}
                      onChange={this.handleInput.bind(this)} />
            <input type="submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

export default EditCommentForm;
