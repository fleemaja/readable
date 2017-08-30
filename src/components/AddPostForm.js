import React, { Component } from 'react';
import Modal from 'react-modal';
import { apiAddPost, toggleModal, changePostForm } from '../actions';
import { connect } from 'react-redux';
import { FaClose } from 'react-icons/lib/fa';

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

class AddPostForm extends Component {
  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const post = this.props.post;
    this.props.addPost(post).then(this.toggleModal());
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let post = Object.assign({}, this.props.post);
    post[property] = newVal;

    this.props.changePost(post);
  }

  toggleModal() {
    this.props.toggleModal();
  }

  render() {
    const post = this.props.post;
    return (
      <div className="modal add-modal">
        <button className="add" onClick={this.toggleModal}>+ Add Post</button>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel="Add Post"
        >
          <div>
            <h2 className="modal-title">Add a New Post</h2>
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
    categories: state.categories,
    modalIsOpen: state.modalIsOpen,
    post: state.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(apiAddPost(post)),
    toggleModal: () => dispatch(toggleModal()),
    changePost: (post) => dispatch(changePostForm(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm);
