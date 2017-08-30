import React, { Component } from 'react';
import Modal from 'react-modal';
import { apiEditPost, toggleEditPostModal, changeEditPostForm  } from '../actions';
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

class EditPostForm extends Component {
  constructor() {
    super();

    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const post = this.props.postToEdit;

    this.props.editPost(post)
              .then(this.toggleModal());
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let post = Object.assign({}, this.props.postToEdit);
    post[property] = newVal;

    this.props.changePostToEdit(post);
  }

  toggleModal() {
    // if modal is being opened change state of post to edit
    if (!this.props.modalIsOpen) {
      const post = this.props.post;
      const p = { postId: post.id, body: post.body,
                  author: post.author, title: post.title,
                  category: post.category }
      this.props.changePostToEdit(p);
    }

    this.props.toggleModal();
  }

  render() {
    const post = this.props.postToEdit;
    return (
      <div className="modal">
        <FaEdit className="edit-button" onClick={this.toggleModal} />
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel="Edit Post"
        >

          <div>
            <h2 className="modal-title">Edit Post</h2>
            <FaClose className="modal-close" onClick={this.toggleModal} />
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label for="author">
              <p>Author</p>
              <input type="text" placeholder="post author" id="author"
                     name="author" value={post.author}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="title">
              <p>Title</p>
              <input type="text" placeholder="post title" id="title"
                     name="title" value={post.title}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="body">
              <p>Body</p>
              <textarea placeholder="post body" name="body" id="body"
                        value={post.body}
                        onChange={this.handleInput.bind(this)} />
            </label>
            <label for="category">
              <p>Category</p>
              <select name="category" id="category"
                      value={post.category}
                      onChange={this.handleInput.bind(this)} >
                {
                  this.props.categories.map((c) =>
                    <option value={c.name}>{c.name}</option>
                  )
                }
              </select>
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
    postToEdit: state.postToEdit,
    categories: state.categories,
    modalIsOpen: state.editPostModalIsOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (post) => dispatch(apiEditPost(post)),
    toggleModal: () => dispatch(toggleEditPostModal()),
    changePostToEdit: (post) => dispatch(changeEditPostForm(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm);
