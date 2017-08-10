import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import * as ReadableAPI from './ReadableAPI';
import './AddPostForm.css';

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

class AddPostForm extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      categories: []
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  openModal() {
    this.setState({modalIsOpen: true});
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
        <button className="add" onClick={this.openModal}>+ Add Post</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add a New Post</h2>
          <button onClick={this.closeModal}>X</button>
          <form>
            <input type="text" placeholder="post author"/>
            <input type="text" placeholder="post title"/>
            <textarea placeholder="post body" />
            <select>
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

export default AddPostForm;
