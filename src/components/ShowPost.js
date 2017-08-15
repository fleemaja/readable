import React, { Component } from 'react';
import Post from './Post';
import Comments from './Comments';
import * as ReadableAPI from '../utils/ReadableAPI';
import NavBar from './NavBar';
import AddCommentForm from './AddCommentForm';
import { fetchPost, fetchPostComments } from '../actions';
import { connect } from 'react-redux';

class ShowPost extends Component {
  state = {
    post: {},
    comments: [],
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
    const postId = this.props.match.params.postId;
    this.props.getPost(postId);
    this.props.getPostComments(postId);
  }

  componentWillReceiveProps = (newVal) => {
    const post = newVal.post;
    const comments = newVal.comments;
    this.setState({ post, comments });
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.sortComments(sortKey);
  }

  sortComments(sortKey) {
    this.setState({ sortKey });
    const comments = this.state.comments.sort(this.sortByKey(sortKey).bind(this));
    this.setState({ comments });
  }

  sortByKey(sortKey) {
    return function(a, b) {
      return a[sortKey] < b[sortKey];
    }
  }

  addComment(comment) {
    const comments = [comment, ...this.state.comments];
    this.sortComments(this.state.sortKey);
    this.setState({ comments })
  }

  render() {
    const post = this.state.post
    const comments = this.state.comments
    return (
      <div>
        <NavBar />
        <Post post={post} />
        <AddCommentForm addComment={this.addComment.bind(this)}
                        parentId={post.id} />
        {
          <select value={this.state.sortKey} onChange={this.handleSortChange.bind(this)} >
            <option value="voteScore" selected={this.state.sortKey === 'voteScore'} >
              Most Votes
            </option>
            <option value="timestamp" selected={this.state.sortKey === 'timestamp'}>
              Most Recent
            </option>
          </select>
        }
        <Comments comments={comments} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    post: state.post,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    getPostComments: (id) => dispatch(fetchPostComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
