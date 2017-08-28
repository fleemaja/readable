import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchCategories, apiAddPost } from '../actions';
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

    this.state = {
      modalIsOpen: false,
      categories: [],
      author: '',
      body: '',
      title: '',
      category: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps = (newVal) => {
    const categories = newVal.categories;
    this.setState({ categories });
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const title = this.state.title;
    const category = this.state.category;

    this.props.addPost(author, body, title, category)
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
      <div className="modal add-modal">
        <button className="add" onClick={this.openModal}>+ Add Post</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h2 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Add a New Post</h2>
            <FaClose className="modal-close" onClick={this.closeModal} />
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label for="author">
              <p>Author</p>
              <input type="text" placeholder="post author" id="author"
                     name="author" value={this.state.author}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="title">
              <p>Title</p>
              <input type="text" placeholder="post title" id="title"
                     name="title" value={this.state.title}
                     onChange={this.handleInput.bind(this)} />
            </label>
            <label for="body">
              <p>Body</p>
              <textarea placeholder="post body" name="body" id="body"
                        value={this.state.body}
                        onChange={this.handleInput.bind(this)} />
            </label>
            <label for="category">
              <p>Category</p>
              <select name="category" id="category"
                      value={this.state.category}
                      onChange={this.handleInput.bind(this)} >
                {
                  this.state.categories.map((c) =>
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
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (author, body, title, category) =>
      dispatch(apiAddPost(author, body, title, category)),
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm);
