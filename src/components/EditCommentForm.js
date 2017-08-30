import React, { Component } from 'react';
import Modal from 'react-modal';
import { apiEditComment, toggleEditCommentModal, changeEditCommentForm } from '../actions';
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
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const comment = this.props.commentToEdit;

    this.props.editComment(comment)
              .then(this.toggleModal());
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let comment = Object.assign({}, this.props.commentToEdit);
    comment[property] = newVal;

    this.props.changeCommentToEdit(comment);
  }

  toggleModal() {
    // if modal is being opened change state of comment to edit
    if (!this.props.modalIsOpen) {
      const comment = this.props.comment;
      const c = { commentId: comment.id,
                  body: comment.body,
                  author: comment.author }
      this.props.changeCommentToEdit(c);
    }

    this.props.toggleModal();
  }

  render() {
    const comment = this.props.commentToEdit;
    return (
      <div className="modal">
        <FaEdit className="edit-button" onClick={this.toggleModal} />
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel="Edit Comment"
        >
          <div>
            <h2 className="modal-title">Edit Comment</h2>
            <FaClose className="modal-close" onClick={this.toggleModal} />
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label for="author">
              <p>Author</p>
              <input type="text" placeholder="comment author" id="author"
                     name="author" value={comment.author}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="body">
              <p>Body</p>
              <textarea placeholder="comment body" name="body" id="body"
                        value={comment.body}
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
    comments: state.comments,
    commentToEdit: state.commentToEdit,
    modalIsOpen: state.editCommentModalIsOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (comment) =>
      dispatch(apiEditComment(comment)),
    toggleModal: () => dispatch(toggleEditCommentModal()),
    changeCommentToEdit: (comment) => dispatch(changeEditCommentForm(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentForm);
