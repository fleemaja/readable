import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm';
import { apiPostVote } from '../actions';
import { connect } from 'react-redux';

class Post extends Component {

  state = {
    post: {}
  }

  componentWillMount() {
    const post = this.props.post;
    this.setState({ post });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ post: nextProps.post });
  }

  deletePost() {
    const postId = this.state.post.id;
    ReadableAPI.deletePost(postId);
    this.props.updatePosts(postId);
  }

  vote(e) {
    const voteType = e.target.value;
    const postId = this.state.post.id;

    this.props.postVote(postId, voteType);
  }

  editPost(editedPost) {
    this.setState({ post: editedPost });
  }

  render() {
    const post = this.state.post;
    if (Object.keys(post).length === 0 && post.constructor === Object) {
      return (<div>Loading...</div>)
    } else {
      return (
          <div className="Post">
            <input type="button" value="upVote" onClick={this.vote.bind(this)} />
            <input type="button" value="downVote" onClick={this.vote.bind(this)} />
            <strong>{`voteScore: ${post.voteScore}`}</strong>
            <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
            <p>{ post.body }</p>
            <p>{ post.author }</p>
            <p>{ post.category }</p>
            <p>{ post.timestamp }</p>
            <input type="button" value="DELETE" onClick={this.deletePost.bind(this)} />
            <EditPostForm post={post} editPost={this.editPost.bind(this)} />
          </div>
        )
    }
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postVote: (id, vote) => dispatch(apiPostVote(id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
