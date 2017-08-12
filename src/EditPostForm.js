import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import * as ReadableAPI from './ReadableAPI';
import './EditPostForm.css';

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

class EditPostForm extends React.Component {
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
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const post = this.props.post;
    this.setState({ author: post.author, body: post.body, title: post.title, category: post.category })
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const title = this.state.title;
    const category = this.state.category;
    const postId = this.props.post.id;

    ReadableAPI.editPost(postId, author, body, title, category)
               .then((p) => {
                 this.props.editPost(p)
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
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="modal">
        <button className="edit" onClick={this.openModal}>Edit Post</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add a New Post</h2>
          <button onClick={this.closeModal}>CLOSE</button>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="post author"
                   name="author" value={this.state.author}
                   onChange={this.handleInput.bind(this)} />
            <input type="text" placeholder="post title"
                   name="title" value={this.state.title}
                   onChange={this.handleInput.bind(this)} />
            <textarea placeholder="post body" name="body"
                      value={this.state.body}
                      onChange={this.handleInput.bind(this)} />
            <select name="category"
                    value={this.state.category}
                    onChange={this.handleInput.bind(this)} >
              {
                this.state.categories.map((c) =>
                  <option value={c.name}>{c.name}</option>
                )
              }
            </select>
            <input type="submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

export default EditPostForm;
