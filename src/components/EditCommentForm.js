import React, { Component } from 'react';
import Modal from 'react-modal';
import { apiEditComment } from '../actions';
import { connect } from 'react-redux';
import { FaEdit, FaClose } from 'react-icons/lib/fa';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditCommentForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      author: '',
      body: ''
    };

    this.openModal = this.openModal.bind(this);
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

    this.props.editComment(commentId, author, body)
              .then(this.closeModal());
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

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="modal">
        <FaEdit className="edit-button" onClick={this.openModal} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h2 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Edit Comment</h2>
            <FaClose className="modal-close" onClick={this.closeModal} />
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label for="author">
              <p>Author</p>
              <input type="text" placeholder="comment author" id="author"
                     name="author" value={this.state.author}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="body">
              <p>Body</p>
              <textarea placeholder="comment body" name="body" id="body"
                        value={this.state.body}
                        onChange={this.handleInput.bind(this)} />
            </label>
            <input type="submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (commentId, body, author) =>
      dispatch(apiEditComment(commentId, body, author))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentForm);
